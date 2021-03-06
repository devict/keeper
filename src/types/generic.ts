import { MessageEvent } from './clients/keeper';
import { Logger } from "./logger";

export interface Startable {
    start(): Promise<void>
}

export interface Stoppable {
    stop(): Promise<void>;
}

export interface BaseOptions {
    logger: Logger;
}

export interface Client extends Startable, Stoppable { };

export type HandlerBody<Command = any, Client = any> = { command: Command, client: Client, logger: Logger }

export type Handler<Command = MessageEvent, Client = any> = (args: HandlerBody<Command, Client>) => Promise<void>;

export interface Command<Command = MessageEvent, Client = any> {
    requireMention: boolean;
    matches: string | RegExp;
    handler: Handler<Command, Client>;
}

export interface CommandClient extends Client {
    registerCommand(command: Command): CommandClient;
};