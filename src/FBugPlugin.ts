import { FBugConfig } from "./FBugConfig";
import { type Log } from "./Log";
import { logLevel } from "./LogLevel";
import { type Plugin } from "./Plugin";

export class FBugPlugin implements Plugin {
  #config: FBugConfig;
  constructor(config: FBugConfig) {
    this.#config = config;
  }

  warn(...args: any[]): void {
    const errorInfo: Log = {
      message: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        )
        .join(" "),
      level: logLevel.WARN,
      timestamp: new Date(),
    };

    this.#reportError(errorInfo);
  }

  error(...args: any[]): void {
    const errorInfo: Log = {
      message: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        )
        .join(" "),
      level: logLevel.ERROR,
      timestamp: new Date(),
    };

    this.#reportError(errorInfo);
  }

  #reportError(errorInfo: Log) {
    console.log("send error", errorInfo);

    if (this.#config.reportUrl) {
      fetch(this.#config.reportUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.#config.apiKey,
        },
        body: JSON.stringify({
          ...errorInfo,
        }),
      });
    }
  }
}
