import { useCallback, useEffect, useRef, useState } from "react";
import type {
  JediCompletion,
  LintMarker,
  TraceEntry,
  WorkerRequest,
  WorkerResponse,
} from "../types/workerMessages";

interface PendingCompletion {
  resolve: (value: JediCompletion[]) => void;
}

interface PendingLint {
  resolve: (value: LintMarker[]) => void;
}

interface RunCodeOptions {
  updateState?: boolean;
}

export function usePyodideWorker() {
  const [isReady, setIsReady] = useState(false);
  const [output, setOutput] = useState("");
  const [traceEntries, setTraceEntries] = useState<TraceEntry[]>([]);
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<number, PendingCompletion>>(new Map());
  const pendingLintRef = useRef<Map<number, PendingLint>>(new Map());
  const nextIdRef = useRef(0);
  const pendingRunRef = useRef<{
    buffer: string;
    resolve: (output: string) => void;
  } | null>(null);

  const postToWorker = useCallback((msg: WorkerRequest) => {
    workerRef.current?.postMessage(msg);
  }, []);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/pyodide.worker.ts", import.meta.url),
    );
    const pendingCompletions = pendingRef.current;
    const pendingLints = pendingLintRef.current;
    const runStateRef = pendingRunRef;

    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data;
      switch (msg.type) {
        case "init-done":
          setIsReady(true);
          break;
        case "stdout":
          setOutput((prev) => prev + msg.text + "\n");
          if (pendingRunRef.current) {
            pendingRunRef.current.buffer += msg.text + "\n";
          }
          break;
        case "stderr":
          setOutput((prev) => prev + "Error: " + msg.text + "\n");
          if (pendingRunRef.current) {
            pendingRunRef.current.buffer += "Error: " + msg.text + "\n";
          }
          break;
        case "run-result":
          if (msg.error) {
            setOutput((prev) => prev + msg.error);
            if (pendingRunRef.current) {
              pendingRunRef.current.buffer += msg.error;
            }
          } else if (msg.result !== undefined) {
            setOutput((prev) => prev + msg.result);
            if (pendingRunRef.current) {
              pendingRunRef.current.buffer += msg.result;
            }
          }
          if (pendingRunRef.current) {
            const { buffer, resolve } = pendingRunRef.current;
            pendingRunRef.current = null;
            resolve(buffer);
          }
          break;
        case "complete-result": {
          const pending = pendingRef.current.get(msg.id);
          if (pending) {
            pending.resolve(msg.suggestions);
            pendingRef.current.delete(msg.id);
          }
          break;
        }
        case "lint-result": {
          const pending = pendingLintRef.current.get(msg.id);
          if (pending) {
            pending.resolve(msg.markers);
            pendingLintRef.current.delete(msg.id);
          }
          break;
        }
        case "trace-result":
          setTraceEntries(msg.entries);
          break;
      }
    };

    workerRef.current = worker;
    postToWorker({ type: "init" });

    return () => {
      worker.terminate();
      workerRef.current = null;
      // Resolve any pending completions/lints so they don't hang
      for (const pending of pendingCompletions.values()) {
        pending.resolve([]);
      }
      pendingCompletions.clear();
      for (const pending of pendingLints.values()) {
        pending.resolve([]);
      }
      pendingLints.clear();
      if (runStateRef.current) {
        runStateRef.current.resolve(runStateRef.current.buffer);
        runStateRef.current = null;
      }
    };
  }, [postToWorker]);

  const runCode = useCallback(
    (code: string, stdinLines?: string[], options: RunCodeOptions = {}) => {
      if (!isReady) return;
      if (options.updateState !== false) {
        setOutput("");
        setTraceEntries([]);
      }
      postToWorker({ type: "run", code, stdinLines });
    },
    [isReady, postToWorker],
  );

  const runCodeAsync = useCallback(
    (
      code: string,
      stdinLines?: string[],
      options: RunCodeOptions = {},
    ): Promise<string> => {
      if (!isReady) return Promise.resolve("");
      if (options.updateState !== false) {
        setOutput("");
        setTraceEntries([]);
      }
      return new Promise((resolve) => {
        pendingRunRef.current = { buffer: "", resolve };
        postToWorker({ type: "run", code, stdinLines });
      });
    },
    [isReady, postToWorker],
  );

  const getCompletions = useCallback(
    (code: string, line: number, column: number): Promise<JediCompletion[]> => {
      if (!isReady) return Promise.resolve([]);

      // Cancel any pending completion — only latest matters
      for (const [oldId, pending] of pendingRef.current.entries()) {
        pending.resolve([]);
        pendingRef.current.delete(oldId);
      }

      const id = nextIdRef.current++;
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          pendingRef.current.delete(id);
          resolve([]);
        }, 4000);

        pendingRef.current.set(id, {
          resolve: (value) => {
            clearTimeout(timer);
            resolve(value);
          },
        });
        postToWorker({ type: "complete", id, code, line, column });
      });
    },
    [isReady, postToWorker],
  );

  const lintCode = useCallback(
    (code: string): Promise<LintMarker[]> => {
      if (!isReady) return Promise.resolve([]);

      const id = nextIdRef.current++;
      return new Promise((resolve) => {
        pendingLintRef.current.set(id, { resolve });
        postToWorker({ type: "lint", id, code });
      });
    },
    [isReady, postToWorker],
  );

  return {
    isReady,
    output,
    traceEntries,
    runCode,
    runCodeAsync,
    getCompletions,
    lintCode,
  };
}
