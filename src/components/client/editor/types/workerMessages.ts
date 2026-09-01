export interface JediCompletion {
  name: string;
  type: string;
  priority: string;
  docstring: string;
}

export interface LintMarker {
  line: number;
  col: number;
  message: string;
  severity: "error" | "warning";
}

export type WorkerRequest =
  | { type: "init" }
  | { type: "run"; code: string; stdinLines?: string[] }
  | { type: "complete"; id: number; code: string; line: number; column: number }
  | { type: "lint"; id: number; code: string };

// Compact trace entry: l = line number, v = local variables snapshot
export interface TraceEntry {
  l: number;
  v: Record<string, string>;
}

export type WorkerResponse =
  | { type: "init-done" }
  | { type: "stdout"; text: string }
  | { type: "stderr"; text: string }
  | { type: "run-result"; result?: string; error?: string }
  | { type: "trace-result"; entries: TraceEntry[] }
  | { type: "complete-result"; id: number; suggestions: JediCompletion[] }
  | { type: "lint-result"; id: number; markers: LintMarker[] };
