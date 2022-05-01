import { SlackEventMiddlewareArgs } from "@slack/bolt";
import { BaseOptions, CommandClient } from "../generic";

export interface KeeperClientOptions extends BaseOptions {
    slackClient: CommandClient;
}

// This is the type fed into the keeper handlers. If you need more data from
// the Slack client, you can add those properties here, and will need to account for
// them in the PhonySlackClient as well.
export type AppMentionEvent = {
    say: SlackEventMiddlewareArgs<'app_mention'>['say'],
    payload: Pick<
        SlackEventMiddlewareArgs<'app_mention'>['payload'],
        'channel' | 'username' | 'text'
    >
};

export type KeeperSlackMiddleware = AppMentionEvent;