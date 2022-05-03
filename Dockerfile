FROM node:17.8.0-buster-slim

WORKDIR /app
COPY . /app
RUN npm install --production

EXPOSE 3000

CMD ["node", "./dist/bin/service.js"]