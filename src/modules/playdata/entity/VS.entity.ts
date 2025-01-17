import { Account, Chart, Playdata, Song } from '@prisma/client';
import { PlaydataUser } from '../model/playdata-user.model';

export class VSEntity {
  chartIdx: number;
  playdata: {
    score: number;
    rank: number;
  } | null;
  rivalPlaydata: {
    score: number;
    rank: number;
  } | null;

  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(
    chartIdx: number,
    playdataDao: Playdata,
    rivalPlaydataDao: Playdata,
  ) {
    const playdata =
      playdataDao === null
        ? null
        : {
            score: playdataDao.score,
            rank: playdataDao.rank,
          };
    const rivalPlaydata =
      rivalPlaydataDao === null
        ? null
        : {
            score: rivalPlaydataDao.score,
            rank: rivalPlaydataDao.rank,
          };
    return new VSEntity({
      chartIdx: chartIdx,
      playdata: playdata,
      rivalPlaydata: rivalPlaydata,
    });
  }
}
