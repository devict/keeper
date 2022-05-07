.PHONY: build
build:
	@docker build -t devict/keeper .

.PHONY: build-dev-workspace
build-dev-workspace:
	@cp .env.default .env
	@$(MAKE) compile
	@echo "Populate the required values in the new .env file! If you are using the local config file, then no need!"

.PHONY: compile
compile:
	@npm run build

.PHONY: dev
dev:
	@docker-compose up

.PHONY: test-local
test-local:
	@nc localhost 3333

.PHONY: start
start:
	@docker run --name keeper -d devict/keeper

.PHONY: stop
stop:
	@docker rm -f keeper