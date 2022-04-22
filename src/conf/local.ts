import Logger from '../lib/logger'
import { ServiceOptions } from '../types/service';

export default function LocalConf(): ServiceOptions {
    const logger = new Logger({
        name: 'Keeper'
    })

    return { clients: [], logger }
}