FROM node:18-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.prod ./

RUN cp .env.prod .env

RUN npm run build

RUN npm prune --production

FROM node:18-slim as production

EXPOSE 8000

WORKDIR /app

COPY --from=build ./app/node_modules ./node_modules

COPY --from=build ./app/dist ./dist

COPY --from=build ./app/src/proto ./dist/proto

COPY --from=build ./app/package.json ./

COPY --from=build ./app/.env.prod ./

RUN cp .env.prod .env

CMD ["node", "dist/main.js"]
