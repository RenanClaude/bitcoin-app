import { BtcDailyPrice } from "../../entities/BtcDailyPrice";
import BtcDailyRepositoryInterface from "../../repositories/BtcDailyPrice-repository";

export class SyncBtcDailyPrice {
  constructor(
    private btcDailyRepositoryInterface: BtcDailyRepositoryInterface,
    private fetchHistoricalPrices: (
      startDate: Date,
      endDate: Date
    ) => Promise<{ date: Date; price: number }[]>,
    private fetchCurrentPrice: () => Promise<{ date: Date; price: number }>
  ) {}

  async execute(): Promise<void> {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    endDate.setDate(endDate.getDate() - 1);
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 365);

    // Verificar dias faltantes
    const missingDates = await this.btcDailyRepositoryInterface.getMissingDates(
      startDate,
      endDate
    );

    if (missingDates.length === 0) return;

    // Separar o dia atual (ou futuro) dos dias históricos
    const today = new Date().toISOString().split("T")[0];
    const historicalDates = missingDates.filter(
      (d) => d.toISOString().split("T")[0] !== today
    );
    // const hasToday = missingDates.some((d) => d.toISOString().split("T")[0] === today);

    // Buscar preços históricos da CoinGecko, se necessário
    let pricesToCreate: { date: Date; price: number }[] = [];
    if (historicalDates.length > 0) {
      pricesToCreate = await this.fetchHistoricalPrices(startDate, endDate);
    }

    // Buscar preço atual da Binance, se necessário
    // if (hasToday) {
    //   const currentPrice = await this.fetchCurrentPrice();
    //   pricesToCreate.push(currentPrice);
    // }

    // Criar registros no banco
    for (const priceData of pricesToCreate) {
      const price = new BtcDailyPrice(priceData.price, priceData.date);
      await this.btcDailyRepositoryInterface.create(price);
    }
  }
}
