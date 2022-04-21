import { App } from '@slack/bolt';
import { CommandClient, Handler } from '../../types/generic';
import { SlackClientOptions } from '../../types/clients/slack'
import { noop } from '../util'


class SlackClient implements CommandClient<SlackClient> {
    private port: number;
    private _client: App;

    constructor(options: SlackClientOptions) {
        this._client = new App({
            signingSecret: options.signingSecret,
            token: options.token,
            socketMode: true,
            appToken: options.appToken
        });
        this.port = options.port;
    }

    start(): Promise<void> {
        return this._client
            .start(this.port)
            .then(this.attachDefaultHandler)
    }

    stop(): Promise<void> {
        return this._client.stop().then(noop)
    }

    registerCommand(command: string, handler: Handler): SlackClient {
        this._client.command(command, args => handler({ command: args, client: this, logger: console.log }));
        return this;
    }

    registerEventHandler(eventName: string, handler: Handler): void {
        this._client.event(eventName, args => handler({ client: this, command: args, logger: console.log }));
    }

    private attachDefaultHandler = () => {
        this._client.error((error: Error) => {
            console.error(error)
            return Promise.resolve();
        })
    }
}

export default SlackClient;
module.exports = SlackClient;