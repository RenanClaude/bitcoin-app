# Etapa 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]