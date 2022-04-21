"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhonyClient {
    start() {
        return Promise.resolve();
    }
    stop() {
        return Promise.reject();
    }
}
exports.default = PhonyClient;
