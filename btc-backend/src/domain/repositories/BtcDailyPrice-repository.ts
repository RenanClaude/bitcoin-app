import { BtcDailyPrice } from "../entities/BtcDailyPrice";

export default interface BtcDailyRepositoryInterface {
  create(btcDailyPrice: BtcDailyPrice): Promise<BtcDailyPrice>;
  findAll(): Promise<BtcDailyPrice[]>;
  getMissingDates(startDate: Date, endDate: Date): Promise<Date[]>;
  // findById(id: string): Promise<BtcDailyPrice | null>;
  // findByDate(date: Date): Promise<BtcDailyPrice | null>;
  // update(id: string, transaction: BtcDailyPrice): Promise<void>;
  // deleteById(id: number): Promise<void>;
}
