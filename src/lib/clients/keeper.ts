import { CommandClient, Command, Client } from '../../types/generic';
import { KeeperClientOptions, KeeperSlackMiddleware } from '../../types/clients/keeper'
import KeeperCommandHandlerMap from '../handlers/keeper';
import { Logger } from '../../types/logger';

class KeeperClient implements CommandClient {
    private logger: Logger;
    private slackClient: CommandClient;
    private slackCommandHandlers: Command<KeeperSlackMiddleware, this>[];

    constructor(options: KeeperClientOptions) {
        this.logger = options.logger;
        this.slackClient = options.slackClient;
        this.slackCommandHandlers = KeeperCommandHandlerMap;
    }

    start = async (): Promise<void> => {
        await this.slackClient.start();
        this.addDefaultCommandHandlers();
        this.logger.log(`Started ${this.constructor.name}#start():SUCCESS`);
    }

    stop = async (): Promise<void> => {
        await this.slackClient.stop();
    }

    registerCommand(command: Command): KeeperClient {
        this.slackCommandHandlers.push(command);
        return this;
    }

    private addDefaultCommandHandlers = () => {
        this.slackCommandHandlers.forEach(command => {
            this.slackClient.registerCommand(command);
        });
    }
}

export default KeeperClient;
module.exports = KeeperClient;
