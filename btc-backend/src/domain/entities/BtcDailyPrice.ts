import Decimal from "decimal.js";

export class BtcDailyPrice {
  constructor(
    public id: number,
    public price: Decimal,
    public date: Date,
    public createdAt: Date
  ) {}
}
