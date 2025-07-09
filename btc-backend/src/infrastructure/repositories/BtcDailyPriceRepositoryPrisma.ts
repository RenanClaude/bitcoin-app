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

  async getDatesInRange(startDate: Date, endDate: Date): Promise<string[]> {
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

    return existingDates.map((d) => d.date.toISOString().split("T")[0]);
  }

  async deleteByDate(date: Date): Promise<void> {
    const beginningOfTheDay = new Date(date); // Cópia para não alterar a original
    const endOfTheDay = new Date(date);
    beginningOfTheDay.setHours(0, 0, 0, 0);
    endOfTheDay.setHours(23, 59, 59);

    const dateToDelete = await this.prisma.btcDailyPrice.findFirst({
      where: { date: { gte: beginningOfTheDay, lte: endOfTheDay } },
      select: { id: true },
    });
    if (dateToDelete) {
      await this.prisma.btcDailyPrice.delete({
        where: { id: dateToDelete.id },
      });
    }
  }

  async findById(id: number): Promise<BtcDailyPrice | null> {
    const result = await this.prisma.btcDailyPrice.findFirst({
      where: {
        id: id,
      },
    });
    return result
      ? new BtcDailyPrice(result.price, result.date, result.updatedAt, result.id)
      : null;
  }

  async deleteOldestIfExceeds(maxRecords: number): Promise<void> {
    const count = await this.prisma.btcDailyPrice.count();
    if (count > maxRecords) {
      const oldest = await this.prisma.btcDailyPrice.findFirst({
        orderBy: { date: "asc" },
        select: { id: true },
      });
      if (oldest) {
        await this.prisma.btcDailyPrice.delete({
          where: { id: oldest.id },
        });
        console.log(
          `Registro mais antigo (id: ${oldest.id}) apagado. Total de registros: ${
            count - 1
          }`
        );
      }
    }
  }
}
