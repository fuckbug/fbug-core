import { LogLevel } from "./LogLevel";

export type Log = {
  message: string;
  level: LogLevel;
  time: number;
};
