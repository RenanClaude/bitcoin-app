// src/domain/use-cases/transaction/delete-transaction.ts
import BtcDailyRepositoryInterface from '../../repositories/BtcDailyPrice-repository';

export class DeleteBtcDailyPrice {
  constructor(private readonly btcDailyRepository: BtcDailyRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const priceAndDayToDelete = await this.btcDailyRepository.findById(id);
    if (!priceAndDayToDelete) {
      throw new Error('Price and date to delete not found');
    }
    await this.btcDailyRepository.delete(id);
  }
}