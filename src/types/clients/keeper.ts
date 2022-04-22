import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import SlackClient from "../../lib/clients/slack";
import { BaseOptions } from "../generic";

export const KeeperSlackCommands = {
    PING: '/ping'
}

export interface KeeperClientOptions extends BaseOptions {
    slackClient: SlackClient;
}

export type KeeperSlackMiddleware = SlackViewMiddlewareArgs & AllMiddlewareArgs;