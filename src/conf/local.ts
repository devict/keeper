import Logger from '../lib/logger'
import { ServiceOptions } from '../types/service';
import PhonySlackClient from '../lib/clients/phony';
import KeeperClient from '../lib/clients/keeper';

export default function LocalConf(): ServiceOptions {
    const logger = new Logger({ name: 'Keeper' });

    const phonyClient = new PhonySlackClient({ logger });
    const keeperClient = new KeeperClient({ slackClient: phonyClient, logger });

    return { clients: [keeperClient], logger }
}