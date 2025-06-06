// src/index.ts
import express from 'express';
import { TransactionController } from './presentation/controllers/btcDailyPrice-controller';
import { CreateTransaction } from './domain/use-cases/transaction/create-transaction';
import { TransactionRepositoryPrisma } from './infrastructure/repositories/transaction-repository-prisma';
import prisma from './infrastructure/database/prisma/prisma-client';

const app = express();
app.use(express.json());

const transactionRepository = new TransactionRepositoryPrisma(prisma);
const createTransaction = new CreateTransaction(transactionRepository);
const transactionController = new TransactionController(createTransaction);

app.post('/transactions', (req, res) => transactionController.create(req, res));

app.listen(3000, () => console.log('Server running on port 3000'));