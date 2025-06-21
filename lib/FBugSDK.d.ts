import { Plugin } from "./Plugin";
import type { LogProviderConfig } from "./LogProviderConfig";
export declare class FBugSDK {
    #private;
    constructor(plugins: Array<Plugin>, logProviderConfig?: LogProviderConfig);
    reportInfo(tag: string, payload: Object): void;
    reportError(tag: string, payload: Object): void;
    reportDebug(tag: string, payload: Object): void;
    reportWarn(tag: string, payload: Object): void;
}
