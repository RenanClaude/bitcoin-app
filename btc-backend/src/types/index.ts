// src/types/index.ts
export interface CreateTransactionDTO {
  date: string;
  amount: number;
  description: string;
  category?: string;
}

export interface UpdateTransactionDTO {
  date?: string;
  amount?: number;
  description?: string;
  category?: string;
}

export interface BtcRealtimePriceDto {
  price: string;
  timestamp: number;
}