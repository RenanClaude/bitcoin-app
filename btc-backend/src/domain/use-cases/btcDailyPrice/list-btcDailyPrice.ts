// src/domain/use-cases/transaction/list-transactions.ts
import { Transaction } from '../../entities/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

export class ListTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return await this.transactionRepository.findAll();
  }
}