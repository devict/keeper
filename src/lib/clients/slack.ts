import { App } from '@slack/bolt';
import { CommandClient, Handler } from '../../types/generic';
import { Logger } from '../../types/logger';
import { SlackClientOptions } from '../../types/clients/slack'

class SlackClient implements CommandClient<SlackClient> {
    private port: number;
    private logger: Logger;
    private _client: App;

    constructor(options: SlackClientOptions) {
        this._client = new App({
            signingSecret: options.signingSecret,
            token: options.token,
            socketMode: true,
            appToken: options.appToken
        });
        this.logger = options.logger;
        this.port = options.port;
    }

    async start(): Promise<void> {
        await this._client.start(this.port);
        this.attachDefaultHandler;
    }

    async stop(): Promise<void> {
        await this._client.stop()
    }

    registerCommand(command: string, handler: Handler): SlackClient {
        this._client.command(command, args => handler({ command: args, client: this, logger: this.logger.log }));
        return this;
    }

    registerEventHandler(eventName: string, handler: Handler): void {
        this._client.event(eventName, args => handler({ client: this, command: args, logger: this.logger.log }));
    }

    private attachDefaultHandler = () => {
        this._client.error((error: Error) => {
            this.logger.error(error)
            return Promise.resolve();
        })
    }
}

export default SlackClient;
module.exports = SlackClient;