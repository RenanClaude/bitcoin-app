// src/presentation/routes/transaction-routes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/btcDailyPrice-controller';

export function btcDailyPriceRoutes(controller: TransactionController): Router {
  const router = Router();

  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.get('/', controller.list.bind(controller));

  return router;
}