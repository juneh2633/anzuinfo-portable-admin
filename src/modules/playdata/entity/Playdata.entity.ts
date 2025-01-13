import { Chart, Playdata, Song } from '@prisma/client';

export class PlaydataEntity {
  score: number;
  rank: number;
  chartVf: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(playdataDao: Playdata) {
    return new PlaydataEntity({
      score: playdataDao.score,
      rank: playdataDao.rank,
      chartVf: playdataDao.chartVf,
    });
  }
}
