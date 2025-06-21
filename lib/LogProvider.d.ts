import type { LogProviderConfig } from "./LogProviderConfig";
import { Plugin } from "./Plugin";
export declare class LogProvider {
    #private;
    constructor(plugins: Array<Plugin>, logProviderConfig?: LogProviderConfig);
}
