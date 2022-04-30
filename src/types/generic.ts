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

export type HandlerBody<Command = any, Client = any> = { command: Command, client: Client, logger: Function }

export type Handler<Command = any, Client = any> = (args: HandlerBody<Command, Client>) => Promise<void>;

export interface Command<Command = any, Client = any> {
    matches: string | RegExp;
    handler: Handler<Command, Client>;
}

export interface CommandClient<T> extends Client {
    registerCommand(command: Command): T;
};