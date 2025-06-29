// src/domain/use-cases/transaction/list-transactions.ts
import { BtcDailyPrice } from '../../entities/BtcDailyPrice';
import  BtcDailyRepositoryInterface  from '../../repositories/BtcDailyPrice-repository';

export class ListBtcDailyPrice {
  constructor(private readonly btcDailyRepository: BtcDailyRepositoryInterface) {}

  async execute(): Promise<BtcDailyPrice[]> {
    return await this.btcDailyRepository.findAll();
  }
}