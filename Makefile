build:
	@docker build -t devict/keeper .

build-dev-workspace:
	@cp .env.default .env
	@$(MAKE) compile
	@echo "Populate the required values in the new .env file! If you are using the local config file, then no need!"

.PHONY: compile
compile:
	@npm run build
dev:
	@./node_modules/.bin/tsc -w 
start:
	@docker run --name keeper -d devict/keeper
stop:
	@docker rm -f keeper