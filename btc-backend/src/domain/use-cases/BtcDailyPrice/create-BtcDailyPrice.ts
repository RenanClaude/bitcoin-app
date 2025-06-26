import { BtcDailyPrice } from "../../entities/BtcDailyPrice";
import BtcDailyRepositoryInterface from "../../repositories/BtcDailyPrice-repository";

export class CreateBtcDailyPrice {
  constructor(private readonly btcDailyRepository: BtcDailyRepositoryInterface) {}

  async execute(input: { price: number; date: Date }): Promise<BtcDailyPrice> {
    const btcDailyPrice = new BtcDailyPrice(input.price, input.date);
    console.log("No use case: " + btcDailyPrice.date)
    const res = await this.btcDailyRepository.create(btcDailyPrice);
    return res;
  }
}
