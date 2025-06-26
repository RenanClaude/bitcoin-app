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

  async execute(isInitialRun: boolean = false): Promise<void> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 364);

    // Verificar dias faltantes
    const missingDates = await this.btcDailyRepositoryInterface.getMissingDates(
      startDate,
      endDate
    );

    if (missingDates.length === 0) return;

    const today = new Date().toISOString().split("T")[0];
    let pricesToCreate: { date: Date; price: number }[] = [];
    const historicalDates = missingDates.filter((d) => d !== today);

    if (isInitialRun && historicalDates.length > 0) {
      const pricesOfTheLast365Days = await this.fetchHistoricalPrices(startDate, endDate);

      // Criar um mapa de preços por data (em formato YYYY-MM-DD) para busca eficiente
      const dateAndObj = new Map<string, { date: Date; price: number }>(
        pricesOfTheLast365Days.map((p) => {
          return [p.date.toISOString().split("T")[0], p];
        })
      );

      // Adicionar preços correspondentes às datas faltantes
      pricesToCreate = historicalDates
        .map((date) => {
          // const dateKey = date;
          const price = dateAndObj.get(date);
          return price !== undefined ? price : null;
        })
        .filter((item): item is { date: Date; price: number } => item !== null);
    } else if (missingDates.length === 1 && missingDates.includes(today)) {
      const currentPrice = await this.fetchCurrentPrice();
      pricesToCreate.push(currentPrice);
    }

    // Criar registros no banco
    for (const priceData of pricesToCreate) {
      const price = new BtcDailyPrice(priceData.price, priceData.date);
      await this.btcDailyRepositoryInterface.create(price);
    }

    // Apagar o registro mais antigo se houver mais de 1825 registros
    if (pricesToCreate.length > 0) {
      await this.btcDailyRepositoryInterface.deleteOldestIfExceeds(1825);
    }
  }
}
