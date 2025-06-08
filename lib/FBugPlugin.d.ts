import { FBugConfig } from "./FBugConfig";
import { type Log } from "./Log";
import { type Plugin } from "./Plugin";
export declare class FBugPlugin implements Plugin {
    #private;
    constructor(config: FBugConfig);
    warn(...args: any[]): void;
    error(...args: any[]): void;
    log(...args: any[]): void;
    reportError(errorInfo: Log): void;
    reportLog(logInfo: Log): void;
}
