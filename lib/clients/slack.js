"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const util_1 = require("../util");
class SlackClient {
    constructor(options) {
        this.attachDefaultHandler = () => {
            this._client.error((error) => {
                console.error(error);
                return Promise.resolve();
            });
        };
        this._client = new bolt_1.App({
            signingSecret: options.signingSecret,
            token: options.token,
            socketMode: true,
            appToken: options.appToken
        });
        this.port = options.port;
    }
    start() {
        return this._client
            .start(this.port)
            .then(this.attachDefaultHandler);
    }
    stop() {
        return this._client.stop().then(util_1.noop);
    }
    registerCommand(command, handler) {
        this._client.command(command, args => handler({ command: args, client: this, logger: console.log }));
        return this;
    }
    registerEventHandler(eventName, handler) {
        this._client.event(eventName, args => handler({ client: this, command: args, logger: console.log }));
    }
}
exports.default = SlackClient;
module.exports = SlackClient;
