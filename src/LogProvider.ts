import { Plugin } from "./Plugin";

export class LogProvider {
  #originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
  };
  #plugins: Array<Plugin>;

  constructor(plugins: Array<Plugin>) {
    this.#plugins = plugins;
    this.#initialize();
  }

  #initialize() {
    console.error = (...args: any[]) => {
      this.#originalConsole.error.apply(console, args);

      this.#plugins.forEach((plugin) => {
        plugin.error(args);
      });
    };

    console.log = (...args: any[]) => {
      this.#originalConsole.log.apply(console, args);

      this.#plugins.forEach((plugin) => {
        plugin.log(args);
      });
    };

    console.warn = (...args: any[]) => {
      this.#originalConsole.warn.apply(console, args);

      this.#plugins.forEach((plugin) => {
        plugin.warn(args);
      });
    };
  }
}
