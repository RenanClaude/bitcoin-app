import { BtcDailyPrice } from "../../domain/entities/BtcDailyPrice";
import BtcDailyRepositoryInterface from "../../domain/repositories/BtcDailyPrice-repository";
import { PrismaClient } from "@prisma/client";

export class BtcDailyPriceRepositoryPrisma implements BtcDailyRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(btcDailyPrice: BtcDailyPrice): Promise<BtcDailyPrice> {
    const created = await this.prisma.btcDailyPrice.create({
      data: { price: btcDailyPrice.price, date: btcDailyPrice.date },
      select: {
        id: true,
        price: true,
        date: true,
        updatedAt: true,
      },
    });
    // console.log(created);
    return new BtcDailyPrice(
      Number(created.price.toFixed(2)),
      created.date,
      created.updatedAt,
      created.id
    );
  }

  async findAll(): Promise<BtcDailyPrice[]> {
    const result = await this.prisma.btcDailyPrice.findMany({
      orderBy: { date: "desc" },
    });
    const list = result.map((r) => new BtcDailyPrice(r.price, r.date, r.updatedAt, r.id));
    return list;
  }

  async getMissingDates(startDate: Date, endDate: Date): Promise<string[]> {
    startDate = new Date(startDate); // Cópia para não alterar a original
    endDate = new Date(endDate);
    startDate.setHours(0, 0, 0, 0);
    const existingDates = await this.prisma.btcDailyPrice.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { date: true },
    });
    console.log("ÚLTIMA DATA: " + existingDates[existingDates.length - 1]?.date.toISOString());
    const existingDateSet = new Set(
      existingDates.map((d) => d.date.toISOString().split("T")[0])
    );
    const missingDates: string[] = [];
    const currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0);

    while (currentDate <= endDate) {
      if (!existingDateSet.has(currentDate.toISOString().split("T")[0])) {
        const date = new Date(currentDate);
        missingDates.push(date.toISOString().split("T")[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return missingDates;
  }

  // async findByDate(date: Date): Promise<BtcDailyPrice | null> {
  //   const isoDate = date.toISOString().split("T")[0];
  //   const result = await this.prisma.btcDailyPrice.findFirst({
  //     where: {
  //       date: {
  //         gte: new Date(`${isoDate}T00:00:00Z`),
  //         lt: new Date(`${isoDate}T23:59:59Z`),
  //       },
  //     },
  //   });
  //   return result
  //     ? new BtcDailyPrice(result.id, result.price, result.date, result.created_at)
  //     : null;
  // }

  // async deleteById(id: number): Promise<void> {
  //   await this.prisma.btcDailyPrice.delete({ where: { id } });
  // }
}
