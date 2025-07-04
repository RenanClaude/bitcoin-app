import { Router } from "express";
import { BtcDailyPriceController } from "../controllers/btcDailyPrice-controller";
import prisma from "../../infrastructure/database/prisma/prisma-client";
import { BtcDailyPriceRepositoryPrisma } from "../../infrastructure/repositories/BtcDailyPriceRepositoryPrisma";
import { CreateBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/create-BtcDailyPrice";
import { ListBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/list-BtcDailyPrice";
import { MissingBtcDailyPrice } from "../../domain/use-cases/BtcDailyPrice/missing-BtcDailyPrice";

// Inicializa dependências
const router = Router();
const btcDailyPriceRepository = new BtcDailyPriceRepositoryPrisma(prisma);
const createBtcDailyPrice = new CreateBtcDailyPrice(btcDailyPriceRepository);
const listBtcDailyPrice = new ListBtcDailyPrice(btcDailyPriceRepository);
const missingBtcDailyPrice = new MissingBtcDailyPrice(btcDailyPriceRepository);
const btcDailyPriceController = new BtcDailyPriceController(
  createBtcDailyPrice,
  listBtcDailyPrice,
  missingBtcDailyPrice
);

router.post("/", (req, res) => btcDailyPriceController.create(req, res));
// router.put('/:id', controller.update.bind(controller));
// router.delete('/:id', controller.delete.bind(controller));
// router.get('/:id', controller.findById.bind(controller));
router.get("/", (req, res) => btcDailyPriceController.list(req, res));
router.get("/missing/:previousDays", (req, res) =>
  btcDailyPriceController.missing(req, res)
);

export default router;
