import type { LintMarker } from "../types/workerMessages";

type Monaco = typeof import("monaco-editor");
type MonacoEditor = import("monaco-editor").editor.IStandaloneCodeEditor;

const LINT_DEBOUNCE_MS = 500;
const LINT_OWNER = "pyflakes";

export function registerPythonLintProvider(
  monaco: Monaco,
  editor: MonacoEditor,
  lintCode: (code: string) => Promise<LintMarker[]>,
) {
  const model = editor.getModel();
  if (!model) return;

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const runLint = async () => {
    const code = model.getValue();
    const markers = await lintCode(code);

    monaco.editor.setModelMarkers(
      model,
      LINT_OWNER,
      markers.map((m) => ({
        severity:
          m.severity === "error"
            ? monaco.MarkerSeverity.Error
            : monaco.MarkerSeverity.Warning,
        startLineNumber: m.line,
        startColumn: m.col,
        endLineNumber: m.line,
        endColumn: model.getLineMaxColumn(m.line),
        message: m.message,
        source: LINT_OWNER,
      })),
    );
  };

  // Lint immediately on mount
  runLint();

  const disposable = model.onDidChangeContent(() => {
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runLint, LINT_DEBOUNCE_MS);
  });

  return disposable;
}
