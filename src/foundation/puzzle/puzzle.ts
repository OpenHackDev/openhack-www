import WeatherSkeleton from "./test_puzzle_skeleton/weather.skeleton.py";

//Represents a puzzle which has a prompt (md unrendered format), and skeleton code
//Accopanied by a list of tests:
// input string (\n sep values for input),
// and output string (expected accumulated output for the given input)

export interface PuzzleMetadata {
    prompt: string,
    skeleton: string,
    tests: Test[]
}

export class Puzzle implements PuzzleMetadata {
    public prompt: string;
    public skeleton: string;
    public tests: Test[];

    constructor(prompt: string, skeleton: string, tests: Test[]) {
        this.prompt = prompt;
        this.skeleton = skeleton;
        this.tests = tests;
    }

    public get(): PuzzleMetadata {
        return {
            prompt: this.prompt,
            skeleton: this.skeleton,
            tests: this.tests
        }
    }
}

// export class Test {
//     public input: string;
//     public output: string;

//     constructor(input: string, output: string) {
//         this.input = input;
//         this.output = output;
//     }
// }

export interface Test {
    input: string,
    output: string
}

export function getTestWeatherPuzzle() {
    const prompt = `A weather station provides a list of hourly temperatures. Your task is to write code that takes this list of temperatures and returns the average temperature for the day. You are given some skeleton code to help you. Good luck!`;
    const tests: Test[] = [
        { input: "[73, 74, 75, 71, 69, 72, 76, 73]", output: "72.875" },
        { input: "[30, 32, 28, 31, 29, 27, 33, 30]", output: "30.0" },
        { input: "[85, 87, 90, 88, 86, 89, 91, 84]", output: "87.5" },
        { input: "[60, 62, 58, 61, 59, 57, 63, 60]", output: "60.0" },
    ]
    const skeleton = WeatherSkeleton;
    return new Puzzle(prompt, skeleton, tests);
}