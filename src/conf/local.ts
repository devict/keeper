import Logger from '../lib/logger'
import { ServiceOptions } from '../types/service';

export default function LocalConf(): ServiceOptions {
    const logger = new Logger({
        name: 'Keeper'
    })

    // const slackClient = new SlackClient({
    //     port: 3000,
    //     signingSecret: getEnv(ENV.SLACK_SIGNING_SECRET),
    //     token: getEnv(ENV.SLACK_BOT_TOKEN),
    //     appToken: getEnv(ENV.SLACK_APP_TOKEN),
    //     logger,
    // })

    // const keeperClient = new KeeperClient({ logger, slackClient })

    return { clients: [], logger }
}