import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SongWithChartWithRadar } from '../model/SongWithChartWithRadar';
import { RedisService } from 'src/common/redis/redis.service';
import { SongWithChartEntity } from '../entity/SongWithChart.entity';
import { metaData } from 'src/common/lib/meta-data';

@Injectable()
export class SongRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}
  async selectSongList(): Promise<{ idx: number; title: string }[]> {
    const songList = this.prismaService.song.findMany({
      select: {
        idx: true,
        title: true,
      },
      orderBy: {
        idx: 'asc',
      },
    });
    return songList;
  }

  // async selectSongAll(): Promise<Song[]> {
  //   return this.prismaService.song.findMany({});
  // }
  async selectSongAll(): Promise<SongWithChartWithRadar[]> {
    return this.prismaService.song.findMany({
      include: {
        chart: {
          include: {
            radar: true,
          },
        },
      },
      orderBy: {
        idx: 'asc',
      },
    });
  }

  async setDataVersion(version: string): Promise<void> {
    await this.redisService.set('version@@@@@', version);
  }
  async getDataVersion(): Promise<string> {
    return await this.redisService.get('version@@@@@');
  }

  async setMetaData(data: SongWithChartEntity[]): Promise<void> {
    const serializedData = JSON.stringify({
      data: data,
      metaData: metaData,
    });
    console.log(serializedData);
    await this.redisService.set('metadata@@@@@@', serializedData);
  }

  async getMetaData(): Promise<any> {
    const serializedData = await this.redisService.get('metadata@@@@@@');
    return JSON.parse(serializedData);
  }
}
