FROM node:17.8.0-buster-slim

WORKDIR /app

COPY . /app

RUN npm install --production

CMD ["node", "./bin/service.js"]