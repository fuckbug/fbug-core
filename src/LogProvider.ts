import type { LogProviderConfig } from "./LogProviderConfig";
import { Plugin } from "./Plugin";

export class LogProvider {
  #originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
  };
  #plugins: Array<Plugin>;
  #logProviderConfig: LogProviderConfig = {
    logErrorReports: {
      log: false,
      warn: true,
      error: true,
    },
  };

  constructor(
    plugins: Array<Plugin>,
    logProviderConfig: LogProviderConfig = this.#logProviderConfig,
  ) {
    this.#logProviderConfig = logProviderConfig;
    this.#plugins = plugins;
    this.#initialize();
  }

  #initialize() {
    if (this.#logProviderConfig.logErrorReports.log) {
      this.#overrideLog();
    }
    if (this.#logProviderConfig.logErrorReports.warn) {
      this.#overrideWarn();
    }
    if (this.#logProviderConfig.logErrorReports.error) {
      this.#overrideError();
    }
  }

  #overrideError(...args: any[]) {
    this.#originalConsole.error.apply(console, args);

    this.#callPlugins((plugin) => {
      plugin.error(args);
    });
  }

  #overrideLog(...args: any[]) {
    this.#originalConsole.log.apply(console, args);

    this.#callPlugins((plugin) => {
      plugin.log(args);
    });
  }

  #overrideWarn(...args: any[]) {
    this.#originalConsole.warn.apply(console, args);

    this.#callPlugins((plugin) => {
      plugin.warn(args);
    });
  }

  #callPlugins(callback: (plugin: Plugin) => void) {
    this.#plugins.forEach((plugin) => {
      callback(plugin);
    });
  }
}
