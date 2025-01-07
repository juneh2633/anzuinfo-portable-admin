import { Injectable, NotFoundException } from '@nestjs/common';
import { ChartRepository } from './repository/chart.repository';
import { RadarRepository } from './repository/radar.repository';
import { ChartWithRadarEntity } from './entity/ChartWithRadar.entity';
import { NoChartException } from './exception/no-chart.exception';
import { RedisCacheService } from 'src/common/redis/redis.service';

@Injectable()
export class ChartService {
  constructor(
    private readonly chartRepository: ChartRepository,
    private readonly redisService: RedisCacheService,
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

      const typeAndTitle = data.type + '____' + data.song.title;

      const safeKey = encodeURIComponent(typeAndTitle);
      await this.chartRepository.setChartIdx(idx, safeKey);

      const value = await this.redisService.get(safeKey);
      console.log(safeKey, value);
    }
  }

  async testCache() {
    const result = await this.redisService.set('test_key', 'test_value', 300); // 5분 TTL
    console.log(result);
    const value = await this.redisService.get('test_key');
    return { key: 'test_key', value };
  }
}
