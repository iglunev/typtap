import { ITestResult } from './test';
export interface ITyptapReporter {
    start(): void;
    label(label: string): void;
    writeTestResult(result: ITestResult): void;
    error(error: any): void;
    end(passed: number, failed: number): void;
    print(message: string, offset?: number): void;
    getTestResult(): ITyptapTestResult[];
}
export interface ITyptapTestResult {
    name: string;
    tests: ITestResult[];
}
export declare class Tap implements ITyptapReporter {
    private buffer;
    private testResult;
    private currentTest;
    getTestResult(): ITyptapTestResult[];
    /** @param {number=} offset */
    print(message: string, offset?: number): string;
    start(): void;
    label(label: string): void;
    writeTestResult(result: ITestResult): void;
    error(error: unknown): void;
    end(passed: number, failed: number): void;
    private flush;
    private indentStack;
}
