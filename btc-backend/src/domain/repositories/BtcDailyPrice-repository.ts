import { BtcDailyPrice } from "../entities/BtcDailyPrice";

export default interface BtcDailyRepositoryInterface {
  create(btcDailyPrice: BtcDailyPrice): Promise<BtcDailyPrice>;
  findAll(): Promise<BtcDailyPrice[]>;
  getMissingDates(startDate: Date, endDate: Date): Promise<string[]>;
  findById(id: number): Promise<BtcDailyPrice | null>;
  deleteOldestIfExceeds(maxRecords: number): Promise<void>;
  getDatesInRange(startDate: Date, endDate: Date): Promise<string[]>
  deleteByDate(date: Date): Promise<void>
}
