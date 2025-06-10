// src/presentation/controllers/transaction-controller.ts
import { Request, Response } from 'express';
import { CreateTransaction } from '../../domain/use-cases/btcDailyPrice/create-btcDailyPrice';
import { BtcDailyPrice } from '../../domain/entities/BtcDailyPrice';

export class BtcDailyPriceController {
  constructor(private readonly createTransaction: CreateTransaction) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { date, price } = req.body;
      const transaction = await this.createTransaction.execute({
        date: new Date(date),
        amount: Number(amount),
        description,
        status: status as TransactionStatus,
        category,
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Outros métodos (update, delete, findById, findAll) seguem estrutura similar
}