import { Injectable } from '@nestjs/common';
import { Playdata, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { PlaydataWithChartAndSong } from '../model/playdata-chart-and-song.model';
import { PlaydataUser } from '../model/playdata-user.model';
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

  async selectVF(accountIdx: number, updateAt: Date): Promise<Playdata[]> {
    return await this.prismaService.playdata.findMany({
      where: {
        accountIdx: accountIdx,
        createdAt: updateAt,
      },
      orderBy: {
        chartVf: 'desc',
      },
      take: 50,
    });
  }
  async selectPlaydataByChart(
    accountIdx: number,
    updateAt: Date,
    chartIdx: number,
  ): Promise<Playdata | null> {
    return await this.prismaService.playdata.findFirst({
      where: {
        accountIdx: accountIdx,
        chartIdx: chartIdx,
        createdAt: updateAt,
      },
    });
  }

  async selectPlaydataByLevel(
    accountIdx: number,
    updateAt: Date,
    level: number,
  ): Promise<Playdata[]> {
    return await this.prismaService.playdata.findMany({
      where: {
        accountIdx: accountIdx,
        createdAt: updateAt,
        chart: {
          level: level,
        },
      },

      orderBy: {
        score: 'desc',
      },
    });
  }

  async selectPlaydataRankingByChart(
    chartIdx: number,
  ): Promise<PlaydataUser[]> {
    return await this.prismaService.playdata.findMany({
      where: {
        chartIdx: chartIdx,
        account: {
          deletedAt: null,
        },
      },
      include: {
        account: {
          select: {
            idx: true,
            sdvxId: true,
            playerName: true,
            skillLevel: true,
            updateAt: true,
            vf: true,
          },
        },
      },
      orderBy: {
        score: 'desc',
      },
    });
  }
}
