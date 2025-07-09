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
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily"
      );
      return response.data.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp),
        price,
      }));
    } catch (error: any) {
      throw new Error(`Falha ao buscar preços históricos da CoinGecko: ${error.message}`);
    }
  }

  private async fetchCurrentPrice(): Promise<{ date: Date; price: number }> {
    try {
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      const date = new Date();
      return { date, price: parseFloat(response.data.price) };
    } catch (error: any) {
      throw new Error(`Falha ao buscar preço atual da Binance: ${error.message}`);
    }
  }

  start(): void {
    // Executa sincronização histórica ao iniciar a API
    this.syncBtcDailyPrice.execute(true).catch(console.error);

    // Agendamento diário às 20:59. O cron funciona por padrão no horário UTC (Coordinated Universal Time).
    // Brasília está no fuso horário UTC-3, então:20:59h em Brasília = 23:59.
    cron.schedule(
      "00 21 * * *",
      () => {
        this.syncBtcDailyPrice.execute(false).catch(console.error);
      },
      { timezone: "America/Sao_Paulo", scheduled: true }
    );
  }
}
