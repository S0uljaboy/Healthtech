FROM node:20-alpine AS builder
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/packages/database
RUN pnpm run generate

WORKDIR /app/apps/web
# Build next application
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app/apps/web

ENV NODE_ENV production

COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
