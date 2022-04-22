"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(options) {
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.clients.map(client => client.start()));
            this.logger.log(`Started ${this.constructor.name}#SUCCESS`);
        });
        this.stop = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.clients.map(client => client.stop()));
            this.logger.log(`Stopped ${this.constructor.name}`);
        });
        this.clients = options.clients;
        this.logger = options.logger;
    }
}
exports.default = Service;
