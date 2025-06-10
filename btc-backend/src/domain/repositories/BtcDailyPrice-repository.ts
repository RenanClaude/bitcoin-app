import { BtcDailyPrice } from "../entities/BtcDailyPrice";

export default interface BtcDailyInterface {
  create(btcDailyPrice: BtcDailyPrice): Promise<BtcDailyPrice>;
  // findById(id: string): Promise<BtcDailyPrice | null>;
  // findByDate(date: Date): Promise<BtcDailyPrice | null>;
  // findAll(): Promise<BtcDailyPrice[]>;
  // update(id: string, transaction: BtcDailyPrice): Promise<void>;
  // deleteById(id: number): Promise<void>;
}
