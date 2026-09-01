import type { JediCompletion } from "../types/workerMessages";

type Monaco = typeof import("monaco-editor");

function toCompletionItemKind(monaco: Monaco, type: string) {
  switch (type) {
    case "function":
      return monaco.languages.CompletionItemKind.Function;
    case "class":
      return monaco.languages.CompletionItemKind.Class;
    case "module":
      return monaco.languages.CompletionItemKind.Module;
    case "param":
      return monaco.languages.CompletionItemKind.Property;
    case "statement":
    case "keyword":
      return monaco.languages.CompletionItemKind.Keyword;
    default:
      return monaco.languages.CompletionItemKind.Variable;
  }
}

export function registerPythonCompletionProvider(
  monaco: Monaco,
  getCompletions: (
    code: string,
    line: number,
    column: number,
  ) => Promise<JediCompletion[]>,
) {
  return monaco.languages.registerCompletionItemProvider("python", {
    triggerCharacters: ["."],

    provideCompletionItems: async (model, position, _context, token) => {
      const code = model.getValue();
      const word = model.getWordUntilPosition(position);

      const range = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );

      const suggestions = await getCompletions(
        code,
        position.lineNumber,
        position.column - 1,
      );

      if (token.isCancellationRequested) {
        return { suggestions: [] };
      }

      return {
        suggestions: suggestions.map((s) => ({
          label: s.name,
          kind: toCompletionItemKind(monaco, s.type),
          insertText: s.name,
          detail: s.type,
          documentation: s.docstring,
          sortText: `${s.priority}-${s.name}`,
          range,
        })),
      };
    },
  });
}
