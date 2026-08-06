FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
