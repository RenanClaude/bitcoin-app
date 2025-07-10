# FROM node:20

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# # Copia os arquivos do projeto (inclusive schema.prisma)
# COPY . .

# # Gera o Prisma Client (espera que prisma/schema.prisma exista)
# RUN npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma

# EXPOSE 3001

# CMD ["npm", "run", "dev"]

# Etapa 1: Build (compila TypeScript, gera Prisma Client)
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera o Prisma Client (ajuste o caminho se necessário)
RUN npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma

# Transpila TypeScript para JavaScript. Você precisa ter "build": "tsc" no package.json. Esse script executa o TypeScript Compiler (tsc) com base no tsconfig.json. Ele transpila todos os arquivos .ts para .js. O resultado vai para a pasta configurada em tsconfig.json (normalmente dist/).
RUN npm run build

# Etapa 2: Produção (apenas arquivos necessários)
FROM node:20 AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Útil para reduzir o tamanho da imagem.
RUN npm install --production

# Expõe a porta usada pela API
EXPOSE 3001

# Executa o código compilado.  Executa o Node.js carregando o arquivo JavaScript principal compilado (dist/index.js).
CMD ["node", "dist/index.js"]
