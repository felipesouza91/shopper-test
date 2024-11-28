FROM node:20.9.0-alpine

WORKDIR /app

COPY package* .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]