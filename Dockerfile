FROM node:18-alpine3.16

RUN mkdir -p /app

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4001

CMD ["yarn", "start"]