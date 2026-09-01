/// <reference lib="webworker" />

import type { WorkerRequest, WorkerResponse } from "../types/workerMessages";
import TRACE_SCRIPT from "./bindings/trace.py";
import JEDI_SETUP from "./bindings/jedi.py";
import LINT_SETUP from "./bindings/lint.py";

declare const self: DedicatedWorkerGlobalScope;

interface PyodideGlobals {
  set(key: string, value: unknown): void;
}

interface PyodideInterface {
  loadPackage(pkg: string): Promise<void>;
  pyimport(name: string): { install(pkg: string): Promise<void> };
  runPythonAsync(code: string): Promise<unknown>;
  globals: PyodideGlobals;
}

declare function loadPyodide(options: {
  indexURL: string;
  stdout: (text: string) => void;
  stderr: (text: string) => void;
}): Promise<PyodideInterface>;

let pyodide: PyodideInterface | null = null;
let operationQueue: Promise<void> = Promise.resolve();

function py(): PyodideInterface {
  if (!pyodide) throw new Error("Pyodide not initialised");
  return pyodide;
}

function post(msg: WorkerResponse) {
  self.postMessage(msg);
}

function enqueueOperation(operation: () => Promise<void>) {
  const nextOperation = operationQueue.then(operation, operation);
  operationQueue = nextOperation.catch((err) => {
    console.error("Worker operation failed:", err);
  });
}

async function initPyodide() {
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    stdout: (text: string) => post({ type: "stdout", text }),
    stderr: (text: string) => post({ type: "stderr", text }),
  });

  await pyodide.loadPackage("jedi");
  
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("pyflakes");

  // Define completion and lint functions once (no re-import per call)
  await pyodide.runPythonAsync(JEDI_SETUP);
  await pyodide.runPythonAsync(LINT_SETUP);

  // Pre-warm jedi so the first user completion is fast
  pyodide.globals.set("_jedi_code", "x = 1\nx");
  pyodide.globals.set("_jedi_line", 2);
  pyodide.globals.set("_jedi_column", 1);
  await pyodide.runPythonAsync("_get_completions()");

  post({ type: "init-done" });
}

async function setupStdin(lines?: string[]) {
  py().globals.set("_raw_stdin_buffer", lines ?? []);
  await py().runPythonAsync(`
_stdin_buffer = [str(x) for x in _raw_stdin_buffer]
_stdin_idx = 0
import builtins
def _buffered_input(prompt=""):
    global _stdin_idx
    if _stdin_idx >= len(_stdin_buffer):
        raise EOFError("No more input available")
    val = _stdin_buffer[_stdin_idx]
    _stdin_idx += 1
    return val
builtins.input = _buffered_input
`);
}

async function runCode(code: string, stdinLines?: string[]) {
  try {
    await setupStdin(stdinLines);
    const result = await py().runPythonAsync(code);
    post({
      type: "run-result",
      result: result !== undefined ? String(result) : undefined,
    });
  } catch (err: unknown) {
    post({ type: "run-result", error: err instanceof Error ? err.message : String(err) });
  }
  // After normal run, produce trace data silently
  await traceCode(code, stdinLines);
}

async function traceCode(code: string, stdinLines?: string[]) {
  try {
    await setupStdin(stdinLines);
    py().globals.set("_trace_user_code", code);
    const result = await py().runPythonAsync(TRACE_SCRIPT);
    post({ type: "trace-result", entries: JSON.parse(result as string) });
  } catch (err) {
    console.error("Trace Error:", err);
    post({ type: "trace-result", entries: [] });
  }
}

async function getCompletions(
  id: number,
  code: string,
  line: number,
  column: number,
) {
  try {
    py().globals.set("_jedi_code", code);
    py().globals.set("_jedi_line", line);
    py().globals.set("_jedi_column", column);

    const result = await py().runPythonAsync("_get_completions()");
    post({ type: "complete-result", id, suggestions: JSON.parse(result as string) });
  } catch (err) {
    console.error("Jedi Error:", err);
    post({ type: "complete-result", id, suggestions: [] });
  }
}

async function lintCode(id: number, code: string) {
  try {
    py().globals.set("_lint_code", code);
    const result = await py().runPythonAsync("_run_lint()");
    post({ type: "lint-result", id, markers: JSON.parse(result as string) });
  } catch (err) {
    console.error("Pyflakes Error:", err);
    post({ type: "lint-result", id, markers: [] });
  }
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;
  enqueueOperation(async () => {
    switch (msg.type) {
      case "init":
        await initPyodide();
        break;
      case "run":
        await runCode(msg.code, msg.stdinLines);
        break;
      case "complete":
        await getCompletions(msg.id, msg.code, msg.line, msg.column);
        break;
      case "lint":
        await lintCode(msg.id, msg.code);
        break;
    }
  });
};
