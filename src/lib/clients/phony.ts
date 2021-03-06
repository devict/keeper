import { BaseOptions, HandlerBody } from '../../types/generic';
import { SayArguments } from "@slack/bolt";
import { MessageEvent } from "../../types/clients/keeper"
import { CommandClient, Command } from '../../types/generic';
import { Logger } from '../../types/logger'
import * as net from 'net';
import { promisify } from 'util';

export default class PhonySlackClient implements CommandClient {
    private logger: Logger;
    private server: net.Server;
    private commands: Command<MessageEvent, this>[];

    constructor(options: BaseOptions) {
        this.commands = [];
        this.logger = options.logger;
        this.server = net.createServer(c => {
            c.on('connect', () => this.logger.log('tcp connection opened'));
            c.on('end', () => this.logger.log('tcp connection closed'));

            c.on('data', async (data) => {
                const msg = data.toString().trim();

                await Promise.all(this.commands.filter(({ matches }) => {
                    switch (typeof matches) {
                        case "object": return matches.test(msg);
                        case "string": return matches == msg;
                    }
                }).map(({ requireMention, handler }) => {
                    if (requireMention && msg.indexOf('@keeper') === -1) {
                        return;
                    }
                    return handler(this.handlerArgs(c, msg))
                }));
            });
        });
    }

    handlerArgs(c: net.Socket, text: string): HandlerBody<MessageEvent, this> {
        return {
            client: this,
            logger: this.logger,
            command: {
                say: async (args: string | SayArguments) => {
                    const text = typeof args === "string" ? args : args.text;
                    c.write(`keeper: ${text}\n`);
                    return { ok: true };
                },
                message: {
                    channel: "#local",
                    user: "Human",
                    text,
                },
            },
        }
    }

    async start(): Promise<void> {
        this.server.listen(3333);
        this.logger.log(`${this.constructor.name}.start():SUCCESS, listening on 3333`)
    }

    async stop(): Promise<void> {
        await promisify(this.server.close)();
        this.logger.log(`${this.constructor.name}.stop():SUCCESS`)
    }

    registerCommand(command: Command): PhonySlackClient {
        this.commands.push(command);
        return this;
    }
}