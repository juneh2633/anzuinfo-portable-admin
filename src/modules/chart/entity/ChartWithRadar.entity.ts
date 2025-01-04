import { Chart, Radar } from '@prisma/client';

export class ChartWithRadarEntity {
  chartIdx: number;
  songIdx: number;
  level: number;
  type: string;
  jacket: string;
  effactor: string;
  illustrator: string;
  maxExscore: number | null;
  maxChain: number;
  chipCount: number;
  holdCount: number;
  tsumamiCount: number;
  notes: number;
  peak: number;
  tsumami: number;
  tricky: number;
  handtrip: number;
  onehand: number;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(chartDao: Chart, radarDao: Radar) {
    return new ChartWithRadarEntity({
      songIdx: chartDao.songIdx,
      level: chartDao.level,
      type: chartDao.type,
      jacket: chartDao.jacket,
      effactor: chartDao.effector,
      illustrator: chartDao.illustrator,
      maxExscore: chartDao.maxExscore,
      maxChain: chartDao.maxChain,
      chipCount: chartDao.chipCount,
      holdCount: chartDao.holdCount,
      tsumamiCount: chartDao.tsumamiCount,
      notes: radarDao.notes,
      peak: radarDao.peak,
      tsumami: radarDao.tsumami,
      tricky: radarDao.tricky,
      handtrip: radarDao.handtrip,
      onehand: radarDao.onehand,
    });
  }
}
