import { BtcRealtimePrice } from '../../domain/entities/BtcRealtimePrice';
import { BtcRealtimePriceRepository } from '../../domain/repositories/BtcRealtimePrice-repository';
import { BinanceWebSocketService } from '../services/binance-websocket';

export class BtcRealtimePriceRepositoryBinance implements BtcRealtimePriceRepository {
  private readonly service: BinanceWebSocketService;

  constructor() {
    this.service = new BinanceWebSocketService();
  }

  subscribeToPrice(callback: (price: BtcRealtimePrice) => void): void {
    this.service.subscribe(callback);
  }

  getLatestPrice(): BtcRealtimePrice | null {
    return this.service.getLatestPrice();
  }
}