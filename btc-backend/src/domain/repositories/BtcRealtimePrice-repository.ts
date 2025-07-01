import { BtcRealtimePrice } from "../entities/BtcRealtimePrice";

export interface BtcRealtimePriceRepository {
  subscribeToPrice(callback: (price: BtcRealtimePrice) => void): void;
  getLatestPrice(): BtcRealtimePrice | null;
}
