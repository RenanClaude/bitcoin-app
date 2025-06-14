import express from 'express';
import { initializeDatabase } from './config/database';
import { BtcDailyPriceController } from './presentation/controllers/btcDailyPrice-controller';
import { CreateBtcDailyPrice } from './domain/use-cases/BtcDailyPrice/create-btcDailyPrice';
import { UpdateTransaction } from './domain/use-cases/BtcDailyPrice/update-btcDailyPrice';
import { DeleteTransaction } from './domain/use-cases/BtcDailyPrice/delete-btcDailyPrice';
// import { GetTransaction } from './domain/use-cases/btcDailyPrice/get-btcDailyPrice';
import { ListBtcDailyPrice } from './domain/use-cases/BtcDailyPrice/list-btcDailyPrice';
import { BtcDailyPriceRepositoryPrisma } from './infrastructure/repositories/BtcDailyPriceRepositoryPrisma';
import prisma from './infrastructure/database/prisma/prisma-client';
import { btcDailyPriceRoutes } from './presentation/routes/btcDailyPrice-routes';

const app = express();
app.use(express.json());

// Inicializa dependências
const btcDailyPriceRepository = new BtcDailyPriceRepositoryPrisma(prisma);
const createBtcDailyPrice = new CreateBtcDailyPrice(btcDailyPriceRepository);
// const updateBtcDailyPrice = new UpdateTransaction(BtcDailyPriceRepository);
// const deleteBtcDailyPrice = new DeleteTransaction(BtcDailyPriceRepository);
// const getBtcDailyPrice = new GetTransaction(BtcDailyPriceRepository);
const listBtcDailyPrice = new ListBtcDailyPrice(btcDailyPriceRepository);
const btcDailyPriceController = new BtcDailyPriceController(
  createBtcDailyPrice,
  // updateBtcDailyPrice,
  // deleteBtcDailyPrice,
  // getBtcDailyPrice,
  listBtcDailyPrice,
);

// Define rotas
app.use('/btc-daily-price', btcDailyPriceRoutes(btcDailyPriceController));

// Middleware de erro global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Inicia o servidor
async function startServer() {
  await initializeDatabase();
  app.listen(3000, () => console.log('Server running on port 3000'));
}

startServer();