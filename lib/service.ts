import { Client } from '../types/generic'
import { ServiceOptions } from '../types/service'

class Service implements Client {
    private clients: Client[];

    constructor(options: ServiceOptions) {
        this.clients = options.clients;
    }


    start = (): Promise<void> => {
        return Promise.all(this.clients.map(client => client.start()))
        .then(() => {
            console.log(`Started ${this.constructor.name}#SUCCESS`)
        });
    }

    stop = (): Promise<void> => {
        return Promise.all(this.clients.map(client => client.stop()))
        .then(() => {
            console.log(`Stopped ${this.constructor.name}`)
        });
    }
}

export default Service;