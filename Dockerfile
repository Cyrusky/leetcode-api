

FROM node:20-alpine AS builder
WORKDIR /app

COPY . .

RUN corepack enable && \
    corepack prepare pnpm@latest-9 --activate && \
    pnpm install && \
    pnpm build

# ----------- 最终镜像 -----------
FROM node:20-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder /app/dist/index.js /usr/src/app

EXPOSE 3000

CMD ["node", "index.js"]
