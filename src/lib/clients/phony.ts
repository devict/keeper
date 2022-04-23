import { BaseOptions, Handler } from '../../types/generic';
import { CommandClient } from '../../types/generic';
import { Logger } from '../../types/logger'

export default class PhonyClient implements CommandClient<PhonyClient> {
    private logger: Logger;
    private handlers: Map<string, Handler>;

    constructor(options: BaseOptions) {
        this.logger = options.logger;
        this.handlers = new Map();
    }

    async start(): Promise<void> {
        // TODO: start listening on stdin somewhere? or an http port?
        this.logger.log(`${this.constructor.name}.start():SUCCESS`)
    }

    async stop(): Promise<void> {
        this.logger.log(`${this.constructor.name}.stop():SUCCESS`)
    }

    registerCommand(command: string, handler: Handler): PhonyClient {
        this.handlers.set(command, handler);
        return this;
    }

    registerEventHandler(eventName: string, handler: Handler): void {
        this.handlers.set(eventName, handler);
    }
}