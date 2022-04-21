"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(options) {
        this.start = () => {
            return Promise.all(this.clients.map(client => client.start()))
                .then(() => {
                console.log(`Started ${this.constructor.name}#SUCCESS`);
            });
        };
        this.stop = () => {
            return Promise.all(this.clients.map(client => client.stop()))
                .then(() => {
                console.log(`Stopped ${this.constructor.name}`);
            });
        };
        this.clients = options.clients;
    }
}
exports.default = Service;
