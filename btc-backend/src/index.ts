// Importa o Prisma Client para interagir com o banco
import { PrismaClient } from "@prisma/client";
// Importa o Express para criar a API HTTP
import express, { Application, Request, Response } from "express";

// Inicializa o cliente Prisma
const prisma = new PrismaClient();
// Inicializa o app Express
const app: Application = express();

// Permite que a API leia JSON no corpo da requisição
app.use(express.json());

// Rota GET simples para retornar todos os preços salvos
app.get("/prices", async (req: Request, res: Response) => {
  try {
    const prices = await prisma.btcDailyPrice.findMany({
      orderBy: { date: "desc" },
    });
    return res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar preços." });
  }
});

// Porta em que a API irá rodar
const PORT = process.env.PORT || 3001;

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
