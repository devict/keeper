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
        this.attachDefaultHandler;
        this.logger.log(`Started SlackClient#start(): listening on port ${this.port}`);
    }

    async stop(): Promise<void> {
        await this._client.stop()
    }

    registerCommand({ matches, handler }: Command): SlackClient {
        this.commands.push({ matches, handler });
        return this;
    }

    private attachDefaultHandler = () => {
        this._client.event("app_mention", async (args) => {
            await Promise.all(this.commands.filter(({ matches }) => {
                switch (typeof matches) {
                    case "object": return matches.test(args.message);
                    case "string": return matches == args.message;
                }
            }).map(({ handler }) => {
                return handler({ client: this, command: args, logger: this.logger })
            }));
        });
        this._client.error((error: Error) => {
            this.logger.error(error)
            return Promise.resolve();
        })
    }
}

export default SlackClient;
module.exports = SlackClient;