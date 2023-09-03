FROM node:20-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]