import { SlackEventMiddlewareArgs } from "@slack/bolt";
import SlackClient from "../../lib/clients/slack";
import PhonyClient from "../../lib/clients/phony";
import { BaseOptions, CommandClient } from "../generic";

export interface KeeperClientOptions extends BaseOptions {
    slackClient: CommandClient<SlackClient | PhonyClient>;
}

// This is the type fed into the keeper handlers. If you need more data from
// the Slack client, you can add those properties here, and will need to account for
// them in the PhonyClient as well.
export type AppMentionEvent = Pick<
    SlackEventMiddlewareArgs<'app_mention'>, 'say'
> & { payload: Pick<SlackEventMiddlewareArgs<'app_mention'>['payload'], 'channel' | 'username' | 'text'> };

export type KeeperSlackMiddleware = AppMentionEvent;