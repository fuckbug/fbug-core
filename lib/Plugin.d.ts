export interface Plugin {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
