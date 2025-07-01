import { BtcRealtimePrice } from "../../entities/BtcRealtimePrice";
import { BtcRealtimePriceRepository } from "../../repositories/BtcRealtimePrice-repository";

export class StreamBtcRealtimePrice {
  constructor(private readonly repository: BtcRealtimePriceRepository) {}

  execute(callback: (price: BtcRealtimePrice) => void): void {
    this.repository.subscribeToPrice(callback);
  }

  getLatestPrice(): BtcRealtimePrice | null {
    return this.repository.getLatestPrice();
  }
}
