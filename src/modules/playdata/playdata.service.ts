import { Injectable } from '@nestjs/common';
import { PlaydataRepository } from './repository/playdata.repository';
import { GetDataDto } from './dto/request/get-data.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SongRepository } from './repository/song.repository';
import { RedisService } from 'src/common/redis/redis.service';
import * as crypto from 'crypto';
import { CommonService } from 'src/common/common.service';
import { PlaydataWithChart } from './entity/PlaydataWithChart.entity';
import { AccountRepository } from '../account/repository/account.repository';
import { NoUserException } from './exception/no-user.exception';

@Injectable()
export class PlaydataService {
  constructor(
    private readonly playdataRepository: PlaydataRepository,
    private readonly songRepository: SongRepository,
    private readonly commonService: CommonService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async postData(getDataDto: GetDataDto) {
    console.log(getDataDto.user);
    const [sdvxId, x, y, z] = getDataDto.user.split('\t');
    const user = await this.accountRepository.selectAccountBySdvxId(sdvxId);
    if (user === null) {
      throw new NoUserException();
    }
    console.log(user);
    const playdataPromises = getDataDto.tracks.map(async (track) => {
      const [title, type, status, score] = track.split('\t');
      const typeAndTitle = type + '____' + title;

      const safeKey = crypto
        .createHash('sha256')
        .update(typeAndTitle, 'utf8')
        .digest('hex');

      let chartIdxWithLevel = '';
      if (title.startsWith('Prayer')) {
        if (title === 'Prayer (MÚSECA)') {
          if (type === 'novice') {
            chartIdxWithLevel = '7231@@6';
          } else if (type === 'advanced') {
            chartIdxWithLevel = '7232@@12';
          } else if (type === 'exhaust') {
            chartIdxWithLevel = '7233@@15';
          } else {
            chartIdxWithLevel = '7234@@18';
          }
        } else {
          if (type === 'novice') {
            chartIdxWithLevel = '2521@@6';
          } else if (type === 'advanced') {
            chartIdxWithLevel = '2522@@12';
          } else {
            chartIdxWithLevel = '2523@@18';
          }
        }
      } else {
        chartIdxWithLevel = await this.redisService.get(safeKey);
      }
      if (chartIdxWithLevel === null) {
        console.log(title);
        return null;
      }
      const [chartIdx, level] = chartIdxWithLevel.split('@@');

      // if (!chartIdx) {
      //   console.warn(`Redis에서 chartIdx를 찾을 수 없습니다: ${type}`);
      //   console.log(title);
      //   return null;
      // }
      const rankIdx = this.commonService.getRankIdx(status);
      // console.log(
      //   chartIdx,
      //   this.commonService.getVolforce(
      //     parseInt(level, 10),
      //     parseInt(score, 10),
      //     rankIdx,
      //   ),
      // );
      return {
        accountIdx: user.idx,
        chartIdx: parseInt(chartIdx, 10),
        chartVf: this.commonService.getVolforce(
          parseInt(level, 10),
          parseInt(score, 10),
          rankIdx,
        ),
        rank: rankIdx,
        score: parseInt(score, 10),
      };
    });

    const playdata = await Promise.all(playdataPromises);

    const validPlaydata = playdata.filter((data) => data !== null);

    await this.playdataRepository.insertPlaydataList(validPlaydata);
    console.log(`${validPlaydata.length}개의 데이터가 저장되었습니다.`);
  }
  async getVFTable(accountIdx: number) {
    const rawData = await this.playdataRepository.selectVF(accountIdx);
    return rawData.map((playdata) =>
      PlaydataWithChart.createDto(
        playdata.chart,
        playdata.chart.song,
        playdata,
      ),
    );
  }

  async testPost() {
    await this.playdataRepository.insertPlaydata(1, 1, 0, 1, 123, null);
  }
}
