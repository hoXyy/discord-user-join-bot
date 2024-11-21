FROM node:16-alpine3.18

RUN corepack enable
RUN corepack prepare pnpm@8.0.0 --activate

WORKDIR /discord-user-join-bot

COPY . .

RUN pnpm install

RUN pnpm run build


CMD ["pnpm", "start"]

