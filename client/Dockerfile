FROM node:18 as base

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN cp .env.dev .env

FROM base as build

WORKDIR /app

COPY --from=base /app/public ./public

COPY --from=base /app/.next ./.next

COPY --from=base /app/package.json ./package.json

COPY --from=base /app/yarn.lock ./yarn.lock

COPY --from=base /app/node_modules ./node_modules

COPY --from=base /app/.env ./.env


EXPOSE 5000

CMD ["yarn", "start"]
