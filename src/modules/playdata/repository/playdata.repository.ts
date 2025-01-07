import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
interface playdata {
  accountIdx: number;
  chartIdx: number;
  chartVf: number;
  rank: number;
  score: number;
}
@Injectable()
export class PlaydataRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async insertPlaydata(
    accountIdx: number,
    chartIdx: number,
    chartVf: number,
    rank: number,
    score: number,
    prismaTx: Prisma.TransactionClient | null,
  ): Promise<void> {
    const prisma = prismaTx ? prismaTx : this.prismaService;
    await prisma.playdata.create({
      data: {
        account: { connect: { idx: accountIdx } },
        chart: { connect: { idx: chartIdx } },
        chartVf: chartVf,
        rank: rank,
        score: score,
      },
    });
  }

  async insertPlaydataList(playdataList: playdata[]): Promise<void> {
    await this.prismaService.playdata.createMany({
      data: playdataList,
    });
  }
}
