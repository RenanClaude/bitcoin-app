import { Request, Response } from "express";
import { CreateBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/create-BtcDailyPrice";
import { ListBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/list-BtcDailyPrice";
import { GetBtcDailyPriceById } from "../../domain/use-cases/BtcDailyPrice/get-BtcDailyPriceById";
import { MissingBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/missing-BtcDailyPrice";

export class BtcDailyPriceController {
  constructor(
    private readonly createBtcDailyPrice: CreateBtcDailyPrice,
    private readonly listBtcDailyPrice: ListBtcDailyPrice,
    private readonly missingBtcDailyPrice: MissingBtcDailyPrice,
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

  // async findById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const btcDailyPrice = await this.getBtcDailyPriceById.execute(+id);
  //     res.status(201).json(btcDailyPrice);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(400).json({ error: error.message });
  //     } else {
  //       res.status(400).json({ error: "Unknown error" });
  //     }
  //   }
  // }

  async missing(req: Request, res: Response): Promise<void> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      const { previousDays } = req.params;
      startDate.setDate(endDate.getDate() - Number(previousDays));

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

}
