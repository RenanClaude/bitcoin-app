// src/domain/use-cases/transaction/get-transaction.ts
import { BtcDailyPrice } from '../../entities/BtcDailyPrice';
import  BtcDailyInterface  from '../../repositories/BtcDailyPrice-repository';

export class GetBtcDailyPriceById {
  constructor(private readonly btcDailyRepository: BtcDailyInterface) {}

  async execute(id: number): Promise<BtcDailyPrice | null> {
    return await this.btcDailyRepository.findById(id);
  }
}