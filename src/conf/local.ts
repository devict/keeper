import Logger from '../lib/logger'
import { ServiceOptions } from '../types/service';
import PhonyClient from '../lib/clients/phony';
import KeeperClient from '../lib/clients/keeper';

export default function LocalConf(): ServiceOptions {
    const logger = new Logger({ name: 'Keeper' });

    const phonyClient = new PhonyClient({ logger });
    const keeperClient = new KeeperClient({ slackClient: phonyClient, logger });

    return { clients: [keeperClient], logger }
}