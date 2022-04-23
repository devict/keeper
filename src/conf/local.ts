import Logger from '../lib/logger'
import { ServiceOptions } from '../types/service';
import PhonyClient from '../lib/clients/phony';

export default function LocalConf(): ServiceOptions {
    const logger = new Logger({ name: 'Keeper' });

    const phonyClient = new PhonyClient({ logger });

    return { clients: [phonyClient], logger }
}