import { FBugConfig } from "./FBugConfig";
import { LogLevel } from "./LogLevel";
import { type Plugin } from "./Plugin";
export declare class FBugPlugin implements Plugin {
    #private;
    constructor(config: FBugConfig);
    warn(...args: any[]): void;
    error(...args: any[]): void;
    log(...args: any[]): void;
    report(tag: string, level: LogLevel, payload?: Object): void;
}
