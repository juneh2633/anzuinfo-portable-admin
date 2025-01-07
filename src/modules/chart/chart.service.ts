import { Injectable, NotFoundException } from '@nestjs/common';
import { ChartRepository } from './repository/chart.repository';
import { RadarRepository } from './repository/radar.repository';
import { ChartWithRadarEntity } from './entity/ChartWithRadar.entity';
import { NoChartException } from './exception/no-chart.exception';
import { RedisService } from 'src/common/redis/redis.service';
import * as crypto from 'crypto';

@Injectable()
export class ChartService {
  constructor(
    private readonly chartRepository: ChartRepository,
    private readonly redisService: RedisService,
    private readonly radarRepository: RadarRepository,
  ) {}

  async findChartByIdx(chartIdx: number): Promise<ChartWithRadarEntity> {
    const [chart, radar] = await Promise.all([
      this.chartRepository.selectChartByIdx(chartIdx),
      this.radarRepository.selectRadorByChartIdx(chartIdx),
    ]);

    if (chart === null) {
      throw new NoChartException();
    }
    return ChartWithRadarEntity.createDto(chart, radar);
  }

  async cacheChart(): Promise<void> {
    const dataList = await this.chartRepository.selectTypeWithTitle();
    for (const data of dataList) {
      const idx = data.idx;

      if (
        data.type !== 'novice' &&
        data.type !== 'advanced' &&
        data.type !== 'exhaust' &&
        data.type !== 'maximum'
      ) {
        data.type = 'infinite';
      }
      const typeAndTitle = data.type + '____' + data.song.title;
      const safeKey = crypto
        .createHash('sha256')
        .update(typeAndTitle, 'utf8')
        .digest('hex');
      const idxWithLevel = idx.toString() + '@@' + data.level.toString();
      await this.chartRepository.setChartIdx(idxWithLevel, safeKey);
    }
  }
}
