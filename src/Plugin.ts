export interface Plugin {
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
