import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import SlackClient from "../../lib/clients/slack";
import PhonyClient from "../../lib/clients/phony";
import { BaseOptions, CommandClient } from "../generic";

export const KeeperSlackCommands = {
    PING: '/ping'
}

export interface KeeperClientOptions extends BaseOptions {
    slackClient: CommandClient<SlackClient | PhonyClient>;
}

export type KeeperSlackMiddleware = SlackViewMiddlewareArgs & AllMiddlewareArgs;