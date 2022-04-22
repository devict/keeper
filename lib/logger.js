"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const logger_1 = require("../types/logger");
class Logger {
    constructor(options) {
        this._client = (0, pino_1.default)({
            name: options.name,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        });
    }
    log(message, level) {
        return this._client[level || logger_1.LogLevel.TRACE](message);
    }
    error(message) {
        return this._client[logger_1.LogLevel.ERROR](message);
    }
}
exports.default = Logger;
module.exports = Logger;
