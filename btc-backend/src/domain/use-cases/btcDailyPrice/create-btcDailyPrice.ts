// src/domain/use-cases/transaction/create-transaction.ts
import { Transaction, TransactionStatus } from '../../entities/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

export class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(input: {
    date: Date;
    amount: number;
    description: string;
    status: TransactionStatus;
    category?: string;
  }): Promise<Transaction> {
    const transaction = Transaction.create(input);
    await this.transactionRepository.create(transaction);
    return transaction;
  }
}