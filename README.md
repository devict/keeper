# Keeper




### Development

#### Quick Start

Keeper be be ran from both your local CLI, as well as in Docker.

#### Local CLI

1. Run `make build-dev-workspace`
2. Populate the data in the newly generated `.env` file
3. You'll need 2 terminals to compile live.
    1. In one terminal, just run `npm start`
    2. In your other terminal, run `make dev`, which will compile your `.ts` files live

Now you can add commands to Keeper in `lib/handlers/keeper.ts`!

#### Docker
**NOTE** As of now, there is no way to develop locally in docker.

To run your local build, run `make build`, then `make start`.
Run `make stop` to kill the container.