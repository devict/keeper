import { Logger } from '../logger';

export interface SlackClientOptions {
    port: number;
    signingSecret: string;
    token: string;
    appToken: string;
    logger: Logger;
}