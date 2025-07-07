FROM node:22-alpine as env
RUN corepack enable
RUN corepack prepare pnpm@10.12.4 --activate


FROM env as build
WORKDIR /discord-user-join-bot

COPY . .
RUN pnpm install
RUN pnpm run build


FROM env as app
WORKDIR /discord-user-join-bot

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=build /discord-user-join-bot/dist ./dist/

CMD ["pnpm", "start"]

