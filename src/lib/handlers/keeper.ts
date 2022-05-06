import { MessageEvent } from "../../types/clients/keeper"
import { Handler } from "../../types/generic";
import KeeperClient from "../clients/keeper"

type CommandHandler = Handler<MessageEvent, KeeperClient>;

export const sayPong: CommandHandler = async ({ logger, command: { say, message } }) => {
    logger.log(`got ping: ${JSON.stringify(message.text)}`);
    await say(`Pong! -- ${message.text}`);
}

export const sayHello: CommandHandler = async ({ command: { say, message } }) => {
    await say(`hello, <@${message.user}>!`);
}

export default [
    {
        requireMention: true,
        matches: /ping/,
        handler: sayPong,
    },
    {
        requireMention: false,
        matches: /hello/,
        handler: sayHello,
    },
]