import { LogLevel } from "./LogLevel";

export type Log = {
  message: string;
  level: LogLevel;
  timestamp: Date;
};
