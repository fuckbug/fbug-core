import { logLevel } from "./LogLevel";
import { LogProvider } from "./LogProvider";
export class FBugSDK {
    #plugins;
    constructor(plugins, logProviderConfig) {
        this.#plugins = plugins;
        new LogProvider(plugins, logProviderConfig);
    }
    reportInfo(tag, payload) {
        this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
    }
    reportError(tag, payload) {
        this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
    }
    reportDebug(tag, payload) {
        this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
    }
    reportWarn(tag, payload) {
        this.#sendReportToPlugins(tag, logLevel.WARN, payload);
    }
    #sendReportToPlugins(tag, level, payload) {
        this.#plugins.forEach((plugin) => plugin.report(tag, level, payload));
    }
}
