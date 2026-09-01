export type TestStatus = "pass" | "fail";

export interface RunResult {
  testIndex: number;
  output: string;
  status: TestStatus;
}
