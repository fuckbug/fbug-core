import { FBugConfig } from "./FBugConfig";
import { type Log } from "./Log";
import { LogLevel, logLevel } from "./LogLevel";
import { type Plugin } from "./Plugin";

export class FBugPlugin implements Plugin {
  #config: FBugConfig;
  constructor(config: FBugConfig) {
    this.#config = config;
  }

  warn(...args: any[]): void {
    const errorInfo: Log = {
      time: this.#getTimeStamp(),
      level: logLevel.WARN,
      message: this.#convertArgsToMessagge(args),
    };

    this.#sendLog(errorInfo);
  }

  error(...args: any[]): void {
    const errorInfo: Log = {
      time: this.#getTimeStamp(),
      level: logLevel.ERROR,
      message: this.#convertArgsToMessagge(args),
    };

    this.#sendLog(errorInfo);
  }

  log(...args: any[]): void {
    const errorInfo: Log = {
      time: this.#getTimeStamp(),
      level: logLevel.ERROR,
      message: this.#convertArgsToMessagge(args),
    };

    this.#sendLog(errorInfo);
  }

  report(tag: string, level: LogLevel, payload: Object): void {
    const errorInfo: Log = {
      time: this.#getTimeStamp(),
      level,
      message: JSON.stringify({
        tag,
        payload,
      }),
    };

    this.#sendLog(errorInfo);
  }

  #convertArgsToMessagge(...args: any[]): string {
    return args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg) : String(arg),
      )
      .join(" ");
  }

  #getTimeStamp(): number {
    return new Date().getTime();
  }

  #sendLog(logInfo: Log) {
    fetch(`${this.#config.dsn}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInfo),
    });
  }
}
