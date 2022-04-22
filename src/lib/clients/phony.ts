import { BaseOptions } from "../../types/generic";
import { Client } from "../../types/generic";
import { Logger } from '../../types/logger'

export default class PhonyClient implements Client {
    private logger: Logger;

    constructor (options: BaseOptions) {
        this.logger = options.logger;
    }

    start(): Promise<void> {
        this.logger.log(`${this.constructor.name}.start():SUCCESS`)
        return Promise.resolve();
    }

    stop(): Promise<void> {
        this.logger.log(`${this.constructor.name}.stop():SUCCESS`)
        return Promise.resolve();
    }
}