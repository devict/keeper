import { Command } from "../../types/generic";

const commands: Command[] = [
    {
        requireMention: true,
        matches: /ping/,
        handler: async ({ logger, command: { say, message } }) => {
            logger.log(`got ping: ${JSON.stringify(message.text)}`);
            await say(`pong! -- ${message.text}`);
        },
    },
    {
        requireMention: false,
        matches: /hello/,
        handler: async ({ command: { say, message } }) => {
            await say(`hello, <@${message.user}>!`);
        },
    },
];

export default commands;