import { App } from '@slack/bolt';
import { CommandClient, Command } from '../../types/generic';
import { Logger } from '../../types/logger';
import { SlackClientOptions } from '../../types/clients/slack'

class SlackClient implements CommandClient {
    private port: number;
    private logger: Logger;
    private _client: App;
    private commands: Command[];

    constructor(options: SlackClientOptions) {
        this._client = new App({
            signingSecret: options.signingSecret,
            token: options.token,
            appToken: options.appToken
        });
        this.commands = [];
        this.logger = options.logger;
        this.port = options.port;
    }

    async start(): Promise<void> {
        await this._client.start({ port: this.port, host: '0.0.0.0' });
        this.attachDefaultHandler();
        this.logger.log(`Started SlackClient#start(): listening on port ${this.port}`);
    }

    async stop(): Promise<void> {
        await this._client.stop()
    }

    registerCommand(command: Command): SlackClient {
        this.commands.push(command);
        return this;
    }

    private attachDefaultHandler = () => {
        this.commands.forEach(({ requireMention, matches, handler }) => {
            this.logger.log(`attaching handler for: ${matches}`);
            this._client.message(matches, async (args) => {
                if (requireMention && !args.message.subtype && args.message.text?.indexOf(`<@${args.context.botUserId}>`) === -1) {
                    return;
                }
                this.logger.log(`message received! ${JSON.stringify(args)}`);
                await handler({ client: this, logger: this.logger, command: args });
            });
        });
        this._client.error(async (err) => this.logger.error(err));
    }

}

export default SlackClient;
module.exports = SlackClient;