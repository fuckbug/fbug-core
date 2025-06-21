import { logLevel } from "./LogLevel";
export class FBugPlugin {
    #config;
    constructor(config) {
        this.#config = config;
    }
    warn(...args) {
        this.#sendLog({
            time: this.#getTimeStamp(),
            level: logLevel.WARN,
            message: this.#convertArgsToString(args[0]),
            context: this.#convertArgsToString(args.slice(1)),
        });
    }
    error(...args) {
        this.#sendLog({
            time: this.#getTimeStamp(),
            level: logLevel.ERROR,
            message: this.#convertArgsToString(args[0]),
            context: this.#convertArgsToString(args.slice(1)),
        });
    }
    log(...args) {
        this.#sendLog({
            time: this.#getTimeStamp(),
            level: logLevel.INFO,
            message: this.#convertArgsToString(args[0]),
            context: this.#convertArgsToString(args.slice(1)),
        });
    }
    report(tag, level, payload) {
        this.#sendLog({
            time: this.#getTimeStamp(),
            level,
            message: tag,
            context: JSON.stringify(payload),
        });
    }
    #convertArgsToString(...args) {
        return args
            .map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg))
            .join(" ");
    }
    #getTimeStamp() {
        return new Date().getTime();
    }
    #sendLog(logInfo) {
        fetch(`${this.#config.dsn}/logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logInfo),
        });
    }
}
