export enum ENV {
    CONF_FILE = 'CONF_FILE',
    SLACK_SIGNING_SECRET = 'SLACK_SIGNING_SECRET',
    SLACK_BOT_TOKEN = 'SLACK_BOT_TOKEN',
    SLACK_APP_TOKEN = 'SLACK_APP_TOKEN'
}

const REQUIRED_ENVIRONMENT = [
    'SLACK_APP_TOKEN',
    'SLACK_SIGNING_SECRET',
    'SLACK_BOT_TOKEN',
    'CONF_FILE'
];

export const assertEnv = () => {
    REQUIRED_ENVIRONMENT.forEach(envName => {
        const envValue = process.env[envName];
        if (!envValue) {
            throw Error(`${envName} is not present in the environment, but is required.`)
        }
    })
}

export const getEnv = (envName: string): string => {
    return process.env[envName]!;
}

module.exports = {
    getEnv,
    assertEnv,
    ENV,
    REQUIRED_ENVIRONMENT
}