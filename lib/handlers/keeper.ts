import { KeeperSlackCommands, KeeperSlackMiddleware } from "../../types/clients/keeper"
import { HandlerBody } from "../../types/generic";
import KeeperClient from "../clients/keeper"

export const sayPong = async (args: HandlerBody<KeeperSlackMiddleware, KeeperClient>): Promise<void> => {
    const { command: { ack, respond }  } = args;
    await ack();
    return await respond('Pong!')
}

export default {
    [KeeperSlackCommands.PING]: sayPong
}