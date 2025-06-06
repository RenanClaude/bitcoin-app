// src/domain/use-cases/transaction/delete-transaction.ts
import { TransactionRepository } from '../../repositories/transaction-repository';

export class DeleteTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    await this.transactionRepository.delete(id);
  }
}