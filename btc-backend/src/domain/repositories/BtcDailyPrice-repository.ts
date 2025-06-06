import { BtcDailyPrice } from "../entities/BtcDailyPrice";

export default interface BtcDailyInterface {
  create(price: number, date: Date): Promise<void>;
  // findById(id: string): Promise<BtcDailyPrice | null>;
  findByDate(date: Date): Promise<BtcDailyPrice | null>;
  // findAll(): Promise<BtcDailyPrice[]>;
  // update(id: string, transaction: Transaction): Promise<void>;
  deleteById(id: number): Promise<void>;
}
