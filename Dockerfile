FROM node:17.8.0-buster-slim

WORKDIR /app

COPY . /app

RUN npm install --production

CMD ["node", "./dist/bin/service.js"]