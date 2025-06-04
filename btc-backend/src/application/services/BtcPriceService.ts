import { prisma } from "../../infrastructure/db/prisma";
import { Request, Response } from "express";

export async function getPrices(req: Request, res: Response) {
  try {
    const prices = await prisma.btcDailyPrice.findMany({
      orderBy: { date: "desc" },
    });
    return res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar preços." });
  }
};