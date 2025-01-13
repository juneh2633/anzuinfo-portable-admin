import { Chart, Playdata, Song } from '@prisma/client';

export class PlaydataEntity {
  chartIdx: number;
  score: number;
  rank: number;
  chartVf: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(playdataDao: Playdata) {
    return new PlaydataEntity({
      chartIdx: playdataDao.chartIdx,
      score: playdataDao.score,
      rank: playdataDao.rank,
      chartVf: playdataDao.chartVf,
    });
  }
}
