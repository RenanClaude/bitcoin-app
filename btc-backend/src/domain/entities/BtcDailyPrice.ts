import Decimal from "decimal.js";

export class BtcDailyPrice {
  constructor(
    private _price: number,
    private _date: Date,
    readonly updatedAt?: Date,
    readonly id?: number
  ) {
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    if (value < 0) {
      throw new Error("The value can not be negative.");
    }
    this._price = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(date: Date) {
    this._date = date;
  }
}
