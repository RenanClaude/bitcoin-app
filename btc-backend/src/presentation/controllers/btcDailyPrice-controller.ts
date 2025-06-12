import { Request, Response } from "express";
import { CreateBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/create-btcDailyPrice";
import { ListBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/list-btcDailyPrice";

export class BtcDailyPriceController {
  constructor(
    private readonly createBtcDailyPrice: CreateBtcDailyPrice,
    private readonly listBtcDailyPrice: ListBtcDailyPrice
  ) {}

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

  async list(req: Request, res: Response): Promise<void> {
    try {
      const btcDailyPriceList = await this.listBtcDailyPrice.execute();
      res.status(200).json(btcDailyPriceList);
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
