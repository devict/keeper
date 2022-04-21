"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keeper_1 = __importDefault(require("../handlers/keeper"));
class KeeperClient {
    constructor(options) {
        this.start = () => {
            return this.slackClient
                .start()
                .then(this.addDefaultCommandHandlers)
                .then(() => {
                this.logger.log(`Started ${this.constructor.name}#start():SUCCESS`);
            });
        };
        this.stop = () => {
            return this.slackClient.stop();
        };
        this.addDefaultCommandHandlers = () => {
            Object.keys(this.slackCommandHandlers).forEach(command => {
                this.slackClient.registerCommand(command, this.slackCommandHandlers[command]);
            });
        };
        this.logger = options.logger;
        this.slackClient = options.slackClient;
        this.slackCommandHandlers = keeper_1.default;
    }
    registerCommand(command, handler) {
        this.slackCommandHandlers[command] = handler;
        this.slackClient.registerCommand(command, handler);
        return this;
    }
}
exports.default = KeeperClient;
module.exports = KeeperClient;
