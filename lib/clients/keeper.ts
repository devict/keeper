import { CommandClient, Handler } from "../../types/generic";
import { KeeperClientOptions, KeeperSlackCommands, KeeperSlackMiddleware } from '../../types/clients/keeper'
import SlackClient from "./slack";
import KeeperCommandHandlerMap from "../handlers/keeper";
import { Logger, LogLevel } from "../../types/logger";

class KeeperClient implements CommandClient<KeeperClient> {
    private logger: Logger;
    private slackClient: SlackClient;
    private slackCommandHandlers: { [command: string]: Handler<KeeperSlackMiddleware> }

    constructor (options: KeeperClientOptions) {
        this.logger = options.logger;
        this.slackClient = options.slackClient;
        this.slackCommandHandlers = KeeperCommandHandlerMap;
    }

    start = (): Promise<void> => {
        return this.slackClient
            .start()
            .then(this.addDefaultCommandHandlers)
            .then(() => {
                this.logger.log(`Started ${this.constructor.name}#start():SUCCESS`)
            })
    }

    stop = (): Promise<void> => {
        return this.slackClient.stop();
    }

    registerCommand(command: string, handler: Handler<any>): KeeperClient {
        this.slackCommandHandlers[command] = handler;
        this.slackClient.registerCommand(command, handler);

        return this;
    }

    private addDefaultCommandHandlers = () => {
        Object.keys(this.slackCommandHandlers).forEach(command => {
            this.slackClient.registerCommand(command, this.slackCommandHandlers[command]);
        });
    }
}

export default KeeperClient;
module.exports = KeeperClient;
