// src/presentation/routes/transaction-routes.ts
import { Router } from "express";
import { BtcDailyPriceController } from "../controllers/btcDailyPrice-controller";

export function btcDailyPriceRoutes(controller: BtcDailyPriceController): Router {
  const router = Router();

  router.post("/", controller.create.bind(controller));
  // router.put('/:id', controller.update.bind(controller));
  // router.delete('/:id', controller.delete.bind(controller));
  // router.get('/:id', controller.getById.bind(controller));
  router.get("/", controller.list.bind(controller));

  router.get("/missing", controller.missing.bind(controller));

  return router;
}
