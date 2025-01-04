import { Injectable } from '@nestjs/common';
import { Chart } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChartRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
}
