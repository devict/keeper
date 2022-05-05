import { KeeperSlackMiddleware } from "../../types/clients/keeper"
import { HandlerBody } from "../../types/generic";
import KeeperClient from "../clients/keeper"

export const sayPong = async (args: HandlerBody<KeeperSlackMiddleware, KeeperClient>): Promise<void> => {
    const { command: { say } } = args;
    await say('Pong!');
}

export const sayHello = async (args: HandlerBody<KeeperSlackMiddleware, KeeperClient>): Promise<void> => {
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