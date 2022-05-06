import { MessageEvent } from "../../types/clients/keeper"
import { HandlerBody } from "../../types/generic";
import KeeperClient from "../clients/keeper"

export const sayPong = async ({ logger, command: { say, message } }: HandlerBody<MessageEvent, KeeperClient>): Promise<void> => {
    logger.log(`got ping: ${JSON.stringify(message.text)}`);
    await say(`Pong! -- ${message.text}`);
}

export const sayHello = async (args: HandlerBody<MessageEvent, KeeperClient>): Promise<void> => {
    const { command: { say, message: { user } } } = args;
    await say(`hello, <@${user}>!`);
}

export default [
    {
        matches: /ping/,
        handler: sayPong,
    },
    {
        matches: /hello/,
        handler: sayHello,
    },
]