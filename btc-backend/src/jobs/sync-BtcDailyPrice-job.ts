import cron from "node-cron";
import axios from "axios";
import { SyncBtcDailyPrice } from "../domain/use-cases/BtcDailyPrice/sync-BtcDailyPrice";
import { BtcDailyPriceRepositoryPrisma } from "../infrastructure/repositories/BtcDailyPriceRepositoryPrisma";
import { PrismaClient } from "@prisma/client";

export class SyncBtcDailyPriceJob {
  private syncBtcDailyPrice: SyncBtcDailyPrice;

  constructor() {
    const prisma = new PrismaClient();
    const btcDailyPriceRepository = new BtcDailyPriceRepositoryPrisma(prisma);

    this.syncBtcDailyPrice = new SyncBtcDailyPrice(
      btcDailyPriceRepository,
      this.fetchHistoricalPrices.bind(this),
      this.fetchCurrentPrice.bind(this)
    );
  }

  private async fetchHistoricalPrices(
    startDate: Date,
    endDate: Date
  ): Promise<{ date: Date; price: number }[]> {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily"
    );
    return response.data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp),
      price,
    }));
  }

  private async fetchCurrentPrice(): Promise<{ date: Date; price: number }> {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return { date, price: parseFloat(response.data.price) };
  }

  start(): void {
    // Executa imediatamente ao iniciar a API
    this.syncBtcDailyPrice.execute().catch(console.error);

    // Agendamento diário às 23:59 (descomentar para ativar)
    cron.schedule('59 23 * * *', () => {
      this.syncBtcDailyPrice.execute().catch(console.error);
    });
  }
}
// 