import { BaseOptions, Handler } from '../../types/generic';
import { CommandClient } from '../../types/generic';
import { Logger } from '../../types/logger'
import { EventEmitter } from 'events';
import * as net from 'net';

export default class PhonyClient extends EventEmitter implements CommandClient<PhonyClient> {
    private logger: Logger;
    private server: net.Server;
    private handlers: Map<string, Handler>;

    constructor(options: BaseOptions) {
        super();
        this.handlers = new Map();
        this.logger = options.logger;
        this.server = net.createServer(c => {
            c.on('connect', () => this.logger.log('tcp connection opened'));
            c.on('end', () => this.logger.log('tcp connection closed'));
            c.on('data', data => {
                const handler = this.handlers.get(data.toString().trim());
                if (handler) handler(this.handlerArgs(c));
            });
        });
    }

    handlerArgs(c: net.Socket) {
        return {
            client: this,
            logger: this.logger.log,
            command: {
                ack: (): Promise<void> => Promise.resolve(),
                respond: async (resp: String): Promise<void> => {
                    c.write(Buffer.from(resp));
                },
            },
        }
    }

    async start(): Promise<void> {
        this.server.listen(3333);
        this.logger.log(`${this.constructor.name}.start():SUCCESS, listening on 3333`)
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