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

    registerCommand({ matches, handler }: Command): SlackClient {
        this.commands.push({ matches, handler });
        return this;
    }

    private attachDefaultHandler = () => {
        // TODO: replace this with this._client.message() usage
        // - https://slack.dev/bolt-js/concepts#message-listening
        // this._client.event("app_mention", async (args) => {
        //     await Promise.all(this.commands.filter(({ matches }) => {
        //         switch (typeof matches) {
        //             case "object": return matches.test(args.message);
        //             case "string": return matches == args.message;
        //         }
        //     }).map(({ handler }) => {
        //         return handler({ client: this, command: args, logger: this.logger })
        //     }));
        // });
        this.commands.forEach(({ matches, handler }) => {
            this.logger.log(`attaching handler for: ${matches}`);
            this._client.message(matches, async (args) => {
                this.logger.log(`message received! ${args}`);
                await handler({ client: this, logger: this.logger, command: args });
            });
        });
        this._client.error(async (error: Error) => this.logger.error(error));
    }
}

export default SlackClient;
module.exports = SlackClient;