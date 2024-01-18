FROM node:18-slim as base
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production=false  --frozen-lockfile

FROM node:18-slim as build
WORKDIR /app
COPY . .
COPY .env.production.local ./.env.production.local
COPY --from=base /app/node_modules ./node_modules
RUN yarn build

FROM node:18-slim as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /app/.env.production.local ./.env.production.local
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["yarn", "start"]
