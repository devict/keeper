"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const env_1 = require("../lib/env");
const service_1 = __importDefault(require("../lib/service"));
(0, env_1.assertEnv)();
const serviceOptions = require(`../conf/${(0, env_1.getEnv)(env_1.ENV.CONF_FILE)}.js`);
const service = new service_1.default(serviceOptions);
service.start().then(() => {
    serviceOptions.logger.log(`[Keeper]: Started Keeper!`);
});
