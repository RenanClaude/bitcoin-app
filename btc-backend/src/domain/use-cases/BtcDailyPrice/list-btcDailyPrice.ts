// src/domain/use-cases/transaction/list-transactions.ts
import { BtcDailyPrice } from '../../entities/BtcDailyPrice';
import  BtcDailyInterface  from '../../repositories/BtcDailyPrice-repository';

export class ListBtcDailyPrice {
  constructor(private readonly btcDailyInterface: BtcDailyInterface) {}

  async execute(): Promise<BtcDailyPrice[]> {
    return await this.btcDailyInterface.findAll();
  }
}