import { BaseOptions, Handler } from '../../types/generic';
import { CommandClient } from '../../types/generic';
import { Logger } from '../../types/logger'
import { EventEmitter } from 'events';

export default class PhonyClient extends EventEmitter implements CommandClient<PhonyClient> {
    private logger: Logger;

    constructor(options: BaseOptions) {
        super();
        this.logger = options.logger;
    }

    async start(): Promise<void> {
        // TODO: start listening on stdin somewhere? or an http port?
        this.logger.log(`${this.constructor.name}.start():SUCCESS`)
    }

    async stop(): Promise<void> {
        this.logger.log(`${this.constructor.name}.stop():SUCCESS`)
    }

    registerCommand(command: string, handler: Handler): PhonyClient {
        this.on(command, handler);
        return this;
    }

    registerEventHandler(eventName: string, handler: Handler): void {
        this.on(eventName, handler);
    }
}