import { Injectable } from '@nestjs/common';
import { PlaydataRepository } from './repository/playdata.repository';
import { GetDataDto } from './dto/request/get-data.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SongRepository } from './repository/song.repository';
import { RedisService } from 'src/common/redis/redis.service';
import * as crypto from 'crypto';
import e from 'express';

@Injectable()
export class PlaydataService {
  constructor(
    private readonly playdataRepository: PlaydataRepository,
    private readonly songRepository: SongRepository,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async postData(getDataDto: GetDataDto) {
    const userData = getDataDto.user;
    const accountIdx = 1;

    await this.prismaService.$transaction(
      async (prisma) => {
        const playdataPromises = getDataDto.tracks.map(async (track) => {
          const [title, type, status, score] = track.split('\t');
          const typeAndTitle = `${type}____${title}`;

          const safeKey = crypto
            .createHash('sha256')
            .update(typeAndTitle, 'utf8')
            .digest('hex');
          let chartIdx = '';
          if (title.startsWith('Prayer')) {
            if (title === 'Prayer (MÚSECA)') {
              chartIdx = '1971';
            } else {
              chartIdx = '772';
            }
          } else {
            chartIdx = await this.redisService.get(safeKey);
          }

          if (!chartIdx) {
            console.warn(`Redis에서 chartIdx를 찾을 수 없습니다: ${type}`);
            console.log(title);
            return null;
          }

          return {
            accountIdx,
            chartIdx: parseInt(chartIdx, 10),
            chartVf: 0,
            rank: 0,
            score: parseInt(score, 10),
          };
        });

        const playdata = await Promise.all(playdataPromises);

        const validPlaydata = playdata.filter((data) => data !== null);

        await this.playdataRepository.insertPlaydataList(validPlaydata);
        console.log(`${validPlaydata.length}개의 데이터가 저장되었습니다.`);
      },
      {
        timeout: 20000,
      },
    );
  }
  async testPost() {
    await this.playdataRepository.insertPlaydata(1, 1, 0, 1, 123, null);
  }
}
