FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:20-slim

ENV NODE_ENV=dev

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app ./

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
