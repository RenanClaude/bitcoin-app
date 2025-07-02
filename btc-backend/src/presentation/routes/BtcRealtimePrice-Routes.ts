import { Router } from 'express';
import { BtcRealtimePriceController } from '../controllers/BtcRealtimePrice-controller';
import { StreamBtcRealtimePrice } from '../../domain/use-cases/BtcRealtimePrice/stream-BtcRealtimePrice';
import { BtcRealtimePriceRepositoryBinance } from '../../infrastructure/repositories/BtcRealtimePrice-repository-binance';

const router = Router();
const repository = new BtcRealtimePriceRepositoryBinance();
const useCase = new StreamBtcRealtimePrice(repository);
const controller = new BtcRealtimePriceController(useCase);

router.get('/stream', (req, res) => controller.stream(req, res));
router.get('/price', (req, res) => controller.getLatestPrice(req, res));

export default router;