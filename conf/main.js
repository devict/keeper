const { getEnv, ENV } = require('../lib/env')
const SlackClient = require('../lib/clients/slack')
const KeeperClient = require('../lib/clients/keeper')
const Logger = require('../lib/logger')

const logger = new Logger({
    name: 'Keeper'
})

const slackClient = new SlackClient({
    port: 3000,
    signingSecret: getEnv(ENV.SLACK_SIGNING_SECRET),
    token: getEnv(ENV.SLACK_BOT_TOKEN),
    appToken: getEnv(ENV.SLACK_APP_TOKEN)
})

const keeperClient = new KeeperClient({
    logger,
    slackClient
})

module.exports = {
    clients: [
        keeperClient
    ]
}