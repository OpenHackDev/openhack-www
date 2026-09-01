"use client";

import Play from "@/icons/play.svg";
import { Editor, Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { BorderedContainer } from "../../interaction/container/BorderedContainer";
import { ColumnLayout } from "../../interaction/layout/ColumnLayout";
import { usePyodideWorker } from "./hooks/usePyodideWorker";
import { registerPythonCompletionProvider } from "./modules/pythonCompletionProvider";
import { registerPythonLintProvider } from "./modules/pythonLintProvider";
import SimpleBar from "simplebar-react";
import { loader } from "@monaco-editor/react";
import { RowLayout } from "../../interaction/layout/RowLayout";
import { IconButton, Button } from "../../interaction/button/BorderedButton";
import { CodeOutput } from "../../documentation/CodeOutput";
import { CodeInputOutput } from "../../documentation/CodeInputOutput";
import { TraceTable } from "../../documentation/TraceTable";
import { CodeInput } from "@/components/documentation/CodeInput";
import { Puzzle, PuzzleMetadata, getTestWeatherPuzzle } from "@/foundation/puzzle/puzzle";
import { Header, SubHeader } from "@/components/interaction/text/Header";
import { Dropdown } from "@/components/interaction/form/Dropdown";
import type { RunResult } from "./types/runResult";
import { LoadingSpinner } from "./LoadingSpinner";

// Ignore stackframe module error
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs",
  },
  "vs/nls": { availableLanguages: { "*": "en" } },
});

export function EditorClient({
  puzzle = getTestWeatherPuzzle(),
}: {
  puzzle?: PuzzleMetadata;
}) {
  const {
    isReady,
    output,
    traceEntries,
    runCodeAsync,
    getCompletions,
    lintCode,
  } = usePyodideWorker();
  const editorRef = useRef<Monaco>(null);
  const [selectedTest, setSelectedTest] = useState("0");
  const [runResults, setRunResults] = useState<Record<string, RunResult>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentTest = puzzle.tests[Number(selectedTest)];
  const currentRunResult: RunResult | null = runResults[selectedTest] ?? null;

  const testOptions = puzzle.tests.map((_: unknown, i: number) => {
    const result = runResults[String(i)];
    let label = `Test ${i + 1}`;
    if (result) {
      label += result.status === "pass" ? " ✅ PASS" : " ❌ FAIL";
    }
    return { label, value: String(i) };
  });

  // Stable refs so onMount closures always call the latest version of these
  const getCompletionsRef = useRef(getCompletions);
  const lintCodeRef = useRef(lintCode);
  // eslint-disable-next-line react-hooks/refs
  getCompletionsRef.current = getCompletions;
  // eslint-disable-next-line react-hooks/refs
  lintCodeRef.current = lintCode;

  useEffect(() => {
    const code = `
    self.MonacoEnvironment = {
      baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/'
    };
    importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/base/worker/workerMain.js');
  `;

    const blob = new Blob([code], { type: "text/javascript" });
    const workerUrl = URL.createObjectURL(blob);

    window.MonacoEnvironment = {
      getWorker: () => new Worker(workerUrl),
    };

    return () => {
      URL.revokeObjectURL(workerUrl);
    };
  }, []);

  const handleRun = async () => {
    if (!editorRef.current || isSubmitting) return;
    const testIdx = selectedTest;
    const test = puzzle.tests[Number(testIdx)];
    const code = editorRef.current.getValue();
    const stdinLines = test ? [test.input] : [];
    const result = await runCodeAsync(code, stdinLines);
    if (test) {
      const passed = result.trim() === test.output.trim();
      setRunResults((prev) => ({
        ...prev,
        [testIdx]: {
          testIndex: Number(testIdx),
          output: result,
          status: passed ? "pass" : "fail",
        },
      }));
    }
  };

  const handleSubmit = async () => {
    if (!editorRef.current || isSubmitting) return;
    setIsSubmitting(true);
    const code = editorRef.current.getValue();
    const newResults: Record<string, RunResult> = {};
    let firstFailIndex: number | null = null;

    for (let i = 0; i < puzzle.tests.length; i++) {
      const test = puzzle.tests[i];
      const result = await runCodeAsync(code, [test.input], {
        updateState: false,
      });
      const passed = result.trim() === test.output.trim();
      newResults[String(i)] = {
        testIndex: i,
        output: result,
        status: passed ? "pass" : "fail",
      };
      if (!passed && firstFailIndex === null) {
        firstFailIndex = i;
      }
    }

    setRunResults(newResults);
    const targetIndex =
      firstFailIndex !== null ? firstFailIndex : puzzle.tests.length - 1;
    setSelectedTest(String(targetIndex));

    // Re-run target test to populate display (output + trace table)
    const targetTest = puzzle.tests[targetIndex];
    if (targetTest) {
      await runCodeAsync(code, [targetTest.input]);
    }

    setIsSubmitting(false);
  };

  return (
    <RowLayout className="relative max-w-100vw">
      {isSubmitting && <LoadingSpinner />}
      <BorderedContainer className="flex-3">
        <ColumnLayout>
          <RowLayout className="flex-0!">
            <IconButton
              onClick={handleRun}
              disabled={!isReady || isSubmitting}
              className="text-white bg-oh-green"
            >
              <Play />
            </IconButton>
            <Button
              onClick={handleSubmit}
              disabled={!isReady || isSubmitting}
              className="text-white bg-oh-blue font-bold"
            >
              Submit
            </Button>
          </RowLayout>

          <BorderedContainer header="your solution" className="flex-1 min-w-0">
            <Editor
              defaultLanguage="python"
              defaultValue={puzzle.skeleton}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
                readOnly: isSubmitting,
              }}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                registerPythonCompletionProvider(monaco, (code, line, column) =>
                  getCompletionsRef.current(code, line, column),
                );
                registerPythonLintProvider(monaco, editor, (code) =>
                  lintCodeRef.current(code),
                );
              }}
            />
          </BorderedContainer>
        </ColumnLayout>
      </BorderedContainer>

      <ColumnLayout className="min-w-0">
        <BorderedContainer>
          <ColumnLayout>
            <Header>problem</Header>
            <p>{puzzle.prompt}</p>
            <SubHeader>example</SubHeader>
            <CodeInputOutput
              input={puzzle.tests[0]?.input ?? ""}
              output={puzzle.tests[0]?.output ?? ""}
            />
          </ColumnLayout>
        </BorderedContainer>

        <BorderedContainer className="flex-1">
          <ColumnLayout>
            <Header>
              <span className="w-max">test results</span>
              <Dropdown
                value={selectedTest}
                onChange={setSelectedTest}
                options={testOptions}
              />
            </Header>
            <CodeInput content={currentTest?.input ?? ""} />
            <TraceTable entries={traceEntries} />
            <CodeOutput
              content={output}
              footer={
                currentRunResult && (
                  <div
                    className={`flex items-center gap-2 px-2 py-1 font-bold ${
                      currentRunResult.status === "pass"
                        ? "text-oh-green"
                        : "text-oh-red"
                    }`}
                  >
                    {currentRunResult.status === "pass"
                      ? "✅ PASS"
                      : "❌ FAIL EXPECTED OUTPUT: \n" +
                        currentTest?.output.trim()}
                  </div>
                )
              }
            />
          </ColumnLayout>
        </BorderedContainer>
      </ColumnLayout>
    </RowLayout>
  );
}
