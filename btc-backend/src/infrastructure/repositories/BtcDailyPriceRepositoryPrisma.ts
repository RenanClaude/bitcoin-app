import { BtcDailyPrice } from "../../domain/entities/BtcDailyPrice";
import BtcDailyInterface from "../../domain/repositories/BtcDailyPrice-repository";
import { PrismaClient } from "@prisma/client";

export class BtcPriceRepository implements BtcDailyInterface {
  constructor(private readonly prisma: PrismaClient) {}
  async findByDate(date: Date): Promise<BtcDailyPrice | null> {
    const isoDate = date.toISOString().split("T")[0];
    const result = await this.prisma.btcDailyPrice.findFirst({
      where: {
        date: {
          gte: new Date(`${isoDate}T00:00:00Z`),
          lt: new Date(`${isoDate}T23:59:59Z`),
        },
      },
    });
    return result
      ? new BtcDailyPrice(result.id, result.price, result.date, result.created_at)
      : null;
  }

  async create(price: number, date: Date): Promise<void> {
    await this.prisma.btcDailyPrice.create({ data: { price, date } });
  }

  async findAllDesc(): Promise<BtcDailyPrice[]> {
    const result = await this.prisma.btcDailyPrice.findMany({ orderBy: { date: "desc" } });
    return result.map((r) => new BtcDailyPrice(r.id, r.price, r.date, r.created_at));
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.btcDailyPrice.delete({ where: { id } });
  }
}
