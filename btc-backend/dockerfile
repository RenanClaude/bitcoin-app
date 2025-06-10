FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia os arquivos do projeto (inclusive schema.prisma)
COPY . .

# Gera o Prisma Client (espera que prisma/schema.prisma exista)
RUN npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma

EXPOSE 3001

CMD ["npm", "run", "dev"]