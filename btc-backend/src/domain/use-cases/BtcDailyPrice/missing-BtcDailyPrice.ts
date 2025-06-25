// src/domain/use-cases/transaction/list-transactions.ts
import { BtcDailyPrice } from '../../entities/BtcDailyPrice';
import  BtcDailyRepositoryInterface  from '../../repositories/BtcDailyPrice-repository';

export class MissingBtcDailyPrice {
  constructor(private readonly btcDailyRepository: BtcDailyRepositoryInterface) {}

  async execute(startDate: Date, endDate: Date): Promise<string[]> {
    return await this.btcDailyRepository.getMissingDates(startDate, endDate);
  }
}