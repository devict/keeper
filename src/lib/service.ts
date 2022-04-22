import { Client } from '../types/generic'
import { Logger } from '../types/logger'
import { ServiceOptions } from '../types/service'

class Service implements Client {
    private clients: Client[];
    private logger: Logger;

    constructor(options: ServiceOptions) {
        this.clients = options.clients;
        this.logger = options.logger;
    }


    start = async (): Promise<void> => {
        await Promise.all(this.clients.map(client => client.start()));
        this.logger.log(`Started ${this.constructor.name}#SUCCESS`);
    }

    stop = async (): Promise<void> => {
        await Promise.all(this.clients.map(client => client.stop()));
        this.logger.log(`Stopped ${this.constructor.name}`);
    }
}

export default Service;