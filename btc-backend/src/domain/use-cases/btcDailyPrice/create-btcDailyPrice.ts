import { BtcDailyPrice } from "../../entities/BtcDailyPrice";
import BtcDailyInterface from "../../repositories/BtcDailyPrice-repository";

export class CreateBtcDailyPrice {
  constructor(private readonly BtcDailyInterface: BtcDailyInterface) {}

  async execute(input: { price: number; date: Date }): Promise<BtcDailyPrice> {
    const btcDailyPrice = new BtcDailyPrice(input.price, input.date);
    await this.BtcDailyInterface.create(btcDailyPrice);
    return btcDailyPrice;
  }
}
