import { AllMiddlewareArgs, SlackEventMiddlewareArgs, GenericMessageEvent, BotMessageEvent } from "@slack/bolt";
import { BaseOptions, CommandClient } from "../generic";

export interface KeeperClientOptions extends BaseOptions {
    slackClient: CommandClient;
}

// This is the type fed into the keeper handlers. If you need more data from
// the Slack client, you can add those properties here, and will need to account for
// them in the PhonySlackClient as well.
export type MessageEvent = {
    say: SlackEventMiddlewareArgs['say'],
    matches?: AllMiddlewareArgs['context']['matches'],
    message: {
        channel: GenericMessageEvent['channel'],
        user?: BotMessageEvent['user'],
        text?: GenericMessageEvent['text'],
    },
};