// src/types/index.ts
import { TransactionStatus } from '../domain/entities/transaction';

export interface CreateTransactionDTO {
  date: string;
  amount: number;
  description: string;
  status: TransactionStatus;
  category?: string;
}

export interface UpdateTransactionDTO {
  date?: string;
  amount?: number;
  description?: string;
  status?: TransactionStatus;
  category?: string;
}