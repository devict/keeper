import { Client } from './generic'
import { Logger } from './logger'

export interface ServiceOptions {
    clients: Client[];
    logger: Logger;
}