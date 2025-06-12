// src/domain/use-cases/transaction/update-transaction.ts
import { Transaction, TransactionStatus } from '../../entities/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

export class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string, input: {
    date?: Date;
    amount?: number;
    description?: string;
    status?: TransactionStatus;
    category?: string;
  }): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    transaction.update(input);
    await this.transactionRepository.update(id, transaction);
    return transaction;
  }
}