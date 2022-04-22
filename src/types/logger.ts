
export enum LogLevel {
    TRACE = "trace",
    DEBUG = 'debug',
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}

export interface Logger {
    log(message: string | object, level?: LogLevel): void;
    error(message: string | object): void;
}

export interface LoggerOptions {
    name: string;
}
