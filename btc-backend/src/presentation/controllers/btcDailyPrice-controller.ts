import { Request, Response } from "express";
import { CreateBtcDailyPrice } from "../../domain/use-cases/btcDailyPrice/create-btcDailyPrice";
import { BtcDailyPrice } from "../../domain/entities/BtcDailyPrice";

export class BtcDailyPriceController {
  constructor(private readonly createBtcDailyPrice: CreateBtcDailyPrice) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { date, price } = req.body;
      const btcDailyPrice = await this.createBtcDailyPrice.execute({ date, price });
      res.status(201).json(btcDailyPrice);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  }

  // Outros métodos (update, delete, findById, findAll) seguem estrutura similar
}
