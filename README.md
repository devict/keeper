# Keeper

The [devICT](https://devict.org) community Slack bot!

### Development

#### Quick Start

Keeper be be ran from both your local CLI, as well as in Docker.

#### Local CLI

1. Run `make build-dev-workspace`
2. Populate the data in the newly generated `.env` file
3. Run `make dev`, which will start docker compose with two services
  1. The `build` service watches and recompiles typescript on file change
  2. The `app` service watches for newly compiled source and restarts the app

Now you can add commands to Keeper in `lib/handlers/keeper.ts`!

#### Interacting with the bot locally

1. Make sure it's running with `make dev` in one terminal
2. In another terminal, run `make test-local` to open a tcp connection to the bot
3. Type commands and see responses! Try `hello` and you should see `keeper: hello, Human!` in response
4. For commands that require a bot mention, use `@keeper` in your message

### Add your first Keeper command!

Head into [Keeper's Handlers](./src/lib/handlers/keeper.ts), where you can add your new command, and it's handler.

This file holds all of the command handlers for the commands that Keeper supports. It exports a map, which is the command and their handlers. The [KeeperClient](./src/lib/clients/keeper.ts) then takes this map, and registers all the commands with Slack.

To add your new command, add your command name to the [KeeperSlackCommands](./src/types/clients/keeper.ts) enum. You can then create your handler in the [Keeper's Handlers](./src/lib/handlers/keeper.ts) file, and add it to the exported map. Wallah, your command is now registered with Keeper!