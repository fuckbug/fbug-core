import { logLevel } from "./LogLevel";
export class FBugPlugin {
    #config;
    constructor(config) {
        this.#config = config;
    }
    warn(...args) {
        const errorInfo = {
            message: args
                .map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg))
                .join(" "),
            level: logLevel.WARN,
            timestamp: new Date(),
        };
        this.reportError(errorInfo);
    }
    error(...args) {
        const errorInfo = {
            message: args
                .map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg))
                .join(" "),
            level: logLevel.ERROR,
            timestamp: new Date(),
        };
        this.reportError(errorInfo);
    }
    log(...args) {
        const errorInfo = {
            message: args
                .map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg))
                .join(" "),
            level: logLevel.ERROR,
            timestamp: new Date(),
        };
        this.reportError(errorInfo);
    }
    reportError(errorInfo) {
        fetch(`${this.#config.dsn}/errors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...errorInfo,
            }),
        });
    }
    reportLog(logInfo) {
        fetch(`${this.#config.dsn}/logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...logInfo,
            }),
        });
    }
}
