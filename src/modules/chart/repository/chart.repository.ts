import { Injectable } from '@nestjs/common';
import { Chart } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class ChartRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async selectChartByIdx(idx: number): Promise<Chart | null> {
    const chart = await this.prismaService.chart.findFirst({
      where: {
        idx: idx,
      },
    });
    return chart;
  }

  async selectChartBySongIdx(songIdx: number): Promise<Chart[]> {
    const chartList = await this.prismaService.chart.findMany({
      where: {
        songIdx: songIdx,
      },
    });
    return chartList;
  }

  async selectTypeWithTitle(): Promise<any[]> {
    const chartList = await this.prismaService.chart.findMany({
      select: {
        idx: true,
        type: true,
        song: true,
        level: true,
      },
      orderBy: {
        idx: 'asc',
      },
    });
    return chartList;
  }

  async selectChartAll(): Promise<Chart[]> {
    return await this.prismaService.chart.findMany({});
  }
  async setChartIdx(idxWithLevel: string, typeAndTitle: string): Promise<void> {
    await this.redisService.set(typeAndTitle, idxWithLevel);
  }
}
