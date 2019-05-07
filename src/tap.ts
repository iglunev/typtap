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
    name: string,
    tests: ITestResult[],
}

export class Tap implements ITyptapReporter {

    private buffer: string[] = [];
    private testResult: ITyptapTestResult[] = [];
    private currentTest!: ITyptapTestResult;

    public getTestResult(): ITyptapTestResult[] {
        return this.testResult;
    }
    /** @param {number=} offset */
    public print(message: string, offset?: number) {
        message = typeof offset === 'number' ? (new Array(offset + 1)).join(' ') + message : message;
        this.buffer.push(message);
        return message;
    }

    public start() {
        this.print('TAP version 13');
    }

    public label(label: string) {
        this.currentTest = {name: label, tests: []};
        this.print('# ' + label);
    }

    public writeTestResult(result: ITestResult) {
        this.currentTest.tests.push(result);
        this.print(`${result.passed ? 'ok' : 'not ok'} ${result.id} ${result.description}`);
    }

    public error(error: unknown) {
        this.print('---', 2);
        if (error instanceof Error) {
            this.print(`name: ${error.name}`, 4);
            this.print(`message: ${error.message}`, 4);
            this.print(`stack: |-\n${this.indentStack(error.stack, 6)}`, 4);
        } else {
            this.print(`error: ${JSON.stringify(error)}`, 4);
        }
        this.print('...', 2);
    }

    public end(passed: number, failed: number) {
        this.testResult.push(this.currentTest);
        const count = passed + failed;
        this.print('1..' + count);
        this.flush();
    }

    private flush() {
        console.log(this.buffer.join('\n'));
        this.buffer = [];
    }

    private indentStack(stack: string | undefined, offset: number) {
        stack = stack ? stack : '';
        return stack.split('\n').map((line) => (new Array(offset + 1)).join(' ') + line).join('\n');
    }

}
