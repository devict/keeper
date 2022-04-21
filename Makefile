build:
	@docker build -t devict/keeper .

build-dev-workspace:
	@cp .env.default .env
	@echo "Populate the required values in the new .env file!"

compile:
	@npm run build
dev:
	@./node_modules/.bin/tsc -w 
start:
	@docker run --name keeper -d devict/keeper
stop:
	@docker rm -f keeper