import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { PlaydataWithChartAndSong } from '../model/playdata-chart-and-song.model';
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

  async selectVF(accountIdx: number): Promise<PlaydataWithChartAndSong[]> {
    return await this.prismaService.playdata.findMany({
      where: {
        accountIdx: accountIdx,
      },
      include: {
        chart: {
          include: {
            song: true,
          },
        },
      },
      orderBy: {
        chartVf: 'desc',
      },
      take: 50,
    });
  }
  async selectPlaydataByChart(
    accountIdx: number,
    chartIdx: number,
  ): Promise<PlaydataWithChartAndSong | null> {
    return await this.prismaService.playdata.findFirst({
      where: {
        accountIdx: accountIdx,
        chartIdx: chartIdx,
      },
      include: {
        chart: {
          include: {
            song: true,
          },
        },
      },
    });
  }
}
