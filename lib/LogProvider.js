export class LogProvider {
    #originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
    };
    #plugins;
    constructor(plugins) {
        this.#plugins = plugins;
        this.#initialize();
    }
    #initialize() {
        console.error = (...args) => {
            this.#originalConsole.error.apply(console, args);
            this.#plugins.forEach((plugin) => {
                plugin.error(args);
            });
        };
        console.log = (...args) => {
            this.#originalConsole.log.apply(console, args);
            this.#plugins.forEach((plugin) => {
                plugin.log(args);
            });
        };
        console.warn = (...args) => {
            this.#originalConsole.warn.apply(console, args);
            this.#plugins.forEach((plugin) => {
                plugin.warn(args);
            });
        };
    }
}
