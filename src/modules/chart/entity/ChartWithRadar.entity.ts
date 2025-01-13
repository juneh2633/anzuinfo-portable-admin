import { Chart, Genre, Radar } from '@prisma/client';
import { RadarEntity } from './Radar.entity';
import { GenreEntity } from './Genre.entity';
import { ChartWithRadar } from '../model/ChartWithRadar';

export class ChartWithRadarEntity {
  chartIdx: number;
  songIdx: number;
  level: number;
  type: string;
  jacket: string;
  effector: string;
  illustrator: string;
  maxExscore: number | null;
  maxChain: number;
  chipCount: number;
  holdCount: number;
  tsumamiCount: number;
  radar: RadarEntity;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(chartDao: Chart, radarDao: Radar) {
    return new ChartWithRadarEntity({
      chartIdx: chartDao.idx,
      songIdx: chartDao.songIdx,
      level: chartDao.level,
      type: chartDao.type,
      jacket: chartDao.jacket,
      effector: chartDao.effector,
      illustrator: chartDao.illustrator,
      maxExscore: chartDao.maxExscore,
      maxChain: chartDao.maxChain,
      chipCount: chartDao.chipCount,
      holdCount: chartDao.holdCount,
      tsumamiCount: chartDao.tsumamiCount,
      radar: RadarEntity.createDto(radarDao),
    });
  }

  public static createDtoMany(chartDaoList: ChartWithRadar[]) {
    return chartDaoList.map((chartDao) => {
      return new ChartWithRadarEntity({
        chartIdx: chartDao.idx,
        songIdx: chartDao.songIdx,
        level: chartDao.level,
        type: chartDao.type,
        jacket: chartDao.jacket,
        effector: chartDao.effector,
        illustrator: chartDao.illustrator,
        maxExscore: chartDao.maxExscore,
        maxChain: chartDao.maxChain,
        chipCount: chartDao.chipCount,
        holdCount: chartDao.holdCount,
        tsumamiCount: chartDao.tsumamiCount,
        radar: chartDao.radar[0],
      });
    });
  }
}
