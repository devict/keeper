import { CommandClient, Handler } from '../../types/generic';
import { KeeperClientOptions, KeeperSlackMiddleware } from '../../types/clients/keeper'
import KeeperCommandHandlerMap from '../handlers/keeper';
import SlackClient from './slack';
import PhonyClient from './phony';
import { Logger } from '../../types/logger';

class KeeperClient implements CommandClient<KeeperClient> {
    private logger: Logger;
    private slackClient: CommandClient<SlackClient | PhonyClient>;
    private slackCommandHandlers: { [command: string]: Handler<KeeperSlackMiddleware> }

    constructor(options: KeeperClientOptions) {
        this.logger = options.logger;
        this.slackClient = options.slackClient;
        this.slackCommandHandlers = KeeperCommandHandlerMap;
    }

    start = async (): Promise<void> => {
        await this.slackClient.start();
        this.addDefaultCommandHandlers;
        this.logger.log(`Started ${this.constructor.name}#start():SUCCESS`);
    }

    stop = async (): Promise<void> => {
        await this.slackClient.stop();
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
