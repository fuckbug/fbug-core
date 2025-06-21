import { type LogLevel, logLevel } from "./LogLevel";
import { LogProvider } from "./LogProvider";
import { Plugin } from "./Plugin";

import type { LogProviderConfig } from "./LogProviderConfig";

export class FBugSDK {
  #plugins;

  constructor(plugins: Array<Plugin>, logProviderConfig?: LogProviderConfig) {
    this.#plugins = plugins;
    new LogProvider(plugins, logProviderConfig);
  }

  reportInfo(tag: string, payload?: Object) {
    this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
  }

  reportError(tag: string, payload?: Object) {
    this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
  }

  reportDebug(tag: string, payload?: Object) {
    this.#sendReportToPlugins(tag, logLevel.DEBUG, payload);
  }

  reportWarn(tag: string, payload?: Object) {
    this.#sendReportToPlugins(tag, logLevel.WARN, payload);
  }

  #sendReportToPlugins(tag: string, level: LogLevel, payload?: Object) {
    this.#plugins.forEach((plugin) => plugin.report(tag, level, payload));
  }
}
