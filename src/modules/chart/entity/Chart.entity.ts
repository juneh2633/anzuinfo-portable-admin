import { Chart } from '@prisma/client';

export class ChartEntity {
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
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(chartDao: Chart) {
    return new ChartEntity({
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
    });
  }
}
