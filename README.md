# Keeper

The [devICT](https://devict.org) community Slack bot!

### Development

#### Quick Start

Keeper be be ran from both your local CLI, as well as in Docker.

Once the bot is running locally, you can interact with it from the terminal.

#### Local CLI

1. Run `npm run build-dev-workspace`
2. Populate the data in the newly generated `.env` file
3. You'll need 2 terminals to compile live.
    1. In one terminal, just run `npm start`
    2. In your other terminal, run `npm run watch`, which will compile your `.ts` files live

Now you can add commands to Keeper in `lib/handlers/keeper.ts`!

#### Docker

Simply run `npm run dev`, which will start docker compose with two services

- The `build` service watches and recompiles typescript on file change
- The `app` service watches for newly compiled source and restarts the app

#### Interacting with the bot locally

1. Make sure it's running with one of the above methods
2. In another terminal, run `nc localhost 3333` to open a tcp connection to the bot
3. Type commands and see responses! Try `hello` and you should see `keeper: hello, Human!` in response

### Add your first Keeper command!

Head into [Keeper's Handlers](./src/lib/handlers/keeper.ts), where you can add your new command, and it's handler.

This file holds all of the command handlers for the commands that Keeper supports. It exports a map, which is the command and their handlers. The [KeeperClient](./src/lib/clients/keeper.ts) then takes this map, and registers all the commands with Slack.

To add your new command, add your command name to the [KeeperSlackCommands](./src/types/clients/keeper.ts) enum. You can then create your handler in the [Keeper's Handlers](./src/lib/handlers/keeper.ts) file, and add it to the exported map. Wallah, your command is now registered with Keeper!