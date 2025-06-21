export class LogProvider {
    #originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
    };
    #plugins;
    #logProviderConfig = {
        logReports: {
            log: false,
            warn: true,
            error: true,
        },
    };
    constructor(plugins, logProviderConfig = this.#logProviderConfig) {
        this.#logProviderConfig = logProviderConfig;
        this.#plugins = plugins;
        this.#initialize();
    }
    #initialize() {
        if (this.#logProviderConfig.logReports.log) {
            this.#overrideLog();
        }
        if (this.#logProviderConfig.logReports.warn) {
            this.#overrideWarn();
        }
        if (this.#logProviderConfig.logReports.error) {
            this.#overrideError();
        }
    }
    #overrideError(...args) {
        this.#originalConsole.error.apply(console, args);
        this.#callPlugins((plugin) => {
            plugin.error(args);
        });
    }
    #overrideLog(...args) {
        this.#originalConsole.log.apply(console, args);
        this.#callPlugins((plugin) => {
            plugin.log(args);
        });
    }
    #overrideWarn(...args) {
        this.#originalConsole.warn.apply(console, args);
        this.#callPlugins((plugin) => {
            plugin.warn(args);
        });
    }
    #callPlugins(callback) {
        this.#plugins.forEach((plugin) => {
            callback(plugin);
        });
    }
}
