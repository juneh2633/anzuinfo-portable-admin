
# Build  Stage
FROM node:22-alpine AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

COPY  . .

RUN npm ci

RUN npx prisma generate

RUN npm run build anzu-info


# Runtime Stage
FROM node:22-alpine AS runtime

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./


# Expose the application port (adjust if necessary)
EXPOSE 3000


CMD ["node", "dist/src/main.js"]