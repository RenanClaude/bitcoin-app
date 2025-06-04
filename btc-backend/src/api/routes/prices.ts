import express from "express";
import { getPrices } from "../../application/services/BtcPriceService";

const router = express.Router();

router.get("/prices", getPrices);

export default router;