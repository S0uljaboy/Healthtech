FROM node:20-alpine AS builder
RUN apk update && apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g pnpm

# Copy monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma and build
WORKDIR /app/packages/database
RUN pnpm run generate

WORKDIR /app/apps/api
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

# Copy built artifacts and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/dev.db ./packages/database/dev.db
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

WORKDIR /app/apps/api
EXPOSE 3001

CMD ["sh", "-c", "cd /app/packages/database && npx prisma db push && cd /app/apps/api && node dist/main.js"]
