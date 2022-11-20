declare class Logger {
    private packageVersion;
    constructor();
    throwError(message: string, args: {
        [key: string]: any;
    }): never;
    throwArgumentError(message: string, arg: string, value: any): never;
    checkSafeUint53(value: number, message?: string): void;
}
export declare const logger: Logger;
export {};
