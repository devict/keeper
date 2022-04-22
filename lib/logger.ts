import pino from 'pino';
import { Logger as LoggerInterface, LoggerOptions, LogLevel } from '../types/logger'

class Logger implements LoggerInterface {
    private _client: pino.BaseLogger;

    constructor(options: LoggerOptions) {
        this._client = pino({
            name: options.name,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        })
    }

    log(message: string | object, level?: LogLevel): void {
        return this._client[level || LogLevel.TRACE](message);
    }

    error(message: string): void {
        return this._client[LogLevel.ERROR](message);
    }
}


export default Logger;
module.exports = Logger;