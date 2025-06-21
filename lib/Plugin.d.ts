import type { LogLevel } from "./LogLevel";
export interface Plugin {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    report(tag: string, level: LogLevel, payload?: Object): void;
}
