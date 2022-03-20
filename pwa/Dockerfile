FROM node:12.20.0

ENV APP_DIR /app/
WORKDIR /app

COPY package.json /app/package.json
COPY . .

RUN npm install
