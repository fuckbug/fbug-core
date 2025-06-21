import { logLevel } from "./LogLevel";
export class FBugPlugin {
    #config;
    constructor(config) {
        this.#config = config;
    }
    warn(...args) {
        const errorInfo = {
            time: this.#getTimeStamp(),
            level: logLevel.WARN,
            message: this.#convertArgsToMessagge(args),
        };
        this.#sendLog(errorInfo);
    }
    error(...args) {
        const errorInfo = {
            time: this.#getTimeStamp(),
            level: logLevel.ERROR,
            message: this.#convertArgsToMessagge(args),
        };
        this.#sendLog(errorInfo);
    }
    log(...args) {
        const errorInfo = {
            time: this.#getTimeStamp(),
            level: logLevel.INFO,
            message: this.#convertArgsToMessagge(args),
        };
        this.#sendLog(errorInfo);
    }
    report(tag, level, payload) {
        const errorInfo = {
            time: this.#getTimeStamp(),
            level,
            message: JSON.stringify({
                tag,
                payload,
            }),
        };
        this.#sendLog(errorInfo);
    }
    #convertArgsToMessagge(...args) {
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
