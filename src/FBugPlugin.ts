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
    this.#sendLog({
      time: this.#getTimeStamp(),
      level: logLevel.WARN,
      message: this.#convertArgsToString(args[0]),
      context: this.#convertArgsToString(args.slice(1)),
    });
  }

  error(...args: any[]): void {
    this.#sendLog({
      time: this.#getTimeStamp(),
      level: logLevel.ERROR,
      message: this.#convertArgsToString(args[0]),
      context: this.#convertArgsToString(args.slice(1)),
    });
  }

  log(...args: any[]): void {
    this.#sendLog({
      time: this.#getTimeStamp(),
      level: logLevel.INFO,
      message: this.#convertArgsToString(args[0]),
      context: this.#convertArgsToString(args.slice(1)),
    });
  }

  report(tag: string, level: LogLevel, payload?: Object): void {
    this.#sendLog({
      time: this.#getTimeStamp(),
      level,
      message: tag,
      context: JSON.stringify(payload),
    });
  }

  #convertArgsToString(...args: any[]): string {
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
