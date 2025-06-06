// src/domain/use-cases/transaction/get-transaction.ts
import { Transaction } from '../../entities/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

export class GetTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<Transaction | null> {
    return await this.transactionRepository.findById(id);
  }
}