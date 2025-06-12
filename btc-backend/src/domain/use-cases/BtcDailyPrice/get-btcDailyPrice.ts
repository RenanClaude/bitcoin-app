// src/domain/use-cases/transaction/get-transaction.ts
import { BtcDailyPrice } from '../../entities/BtcDailyPrice';
import  BtcDailyInterface  from '../../repositories/BtcDailyPrice-repository';

export class GetBtcDailyPrice {
  constructor(private readonly BtcDailyInterface: BtcDailyInterface) {}

  async execute(id: string): Promise<BtcDailyPrice | null> {
    return await this.transactionRepository.findById(id);
  }
}