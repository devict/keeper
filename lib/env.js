"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = exports.assertEnv = exports.ENV = void 0;
var ENV;
(function (ENV) {
    ENV["CONF_FILE"] = "CONF_FILE";
    ENV["SLACK_SIGNING_SECRET"] = "SLACK_SIGNING_SECRET";
    ENV["SLACK_BOT_TOKEN"] = "SLACK_BOT_TOKEN";
    ENV["SLACK_APP_TOKEN"] = "SLACK_APP_TOKEN";
})(ENV = exports.ENV || (exports.ENV = {}));
const REQUIRED_ENVIRONMENT = [
    'SLACK_APP_TOKEN',
    'SLACK_SIGNING_SECRET',
    'SLACK_BOT_TOKEN',
    'CONF_FILE'
];
const assertEnv = () => {
    REQUIRED_ENVIRONMENT.forEach(envName => {
        const envValue = process.env[envName];
        if (!envValue) {
            throw Error(`${envName} is not present in the environment, but is required.`);
        }
    });
};
exports.assertEnv = assertEnv;
const getEnv = (envName) => {
    return process.env[envName];
};
exports.getEnv = getEnv;
module.exports = {
    getEnv: exports.getEnv,
    assertEnv: exports.assertEnv,
    ENV,
    REQUIRED_ENVIRONMENT
};
