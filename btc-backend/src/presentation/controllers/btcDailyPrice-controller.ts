import { Request, Response } from "express";
import { CreateBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/create-BtcDailyPrice";
import { ListBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/list-BtcDailyPrice";
import { MissingBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/missing-BtcDailyPrice";

export class BtcDailyPriceController {
  constructor(
    private readonly createBtcDailyPrice: CreateBtcDailyPrice,
    private readonly listBtcDailyPrice: ListBtcDailyPrice,
    private readonly missingBtcDailyPrice: MissingBtcDailyPrice
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

  async missing(req: Request, res: Response): Promise<void> {
    try {
      const endDate = new Date();
      // endDate.setHours(23, 59, 59);
      // endDate.setDate(endDate.getDate() - 1);
      const startDate = new Date();
      startDate.setHours(0, 0, 0);
      startDate.setDate(endDate.getDate() - 364);

      const missing = await this.missingBtcDailyPrice.execute(startDate, endDate);
      res.status(200).json(missing);
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
