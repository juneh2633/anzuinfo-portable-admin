import { Account, Chart, Playdata, Song } from '@prisma/client';
import { PlaydataUser } from '../model/playdata-user.model';
import { PlaydataVS } from '../model/playdata-vs.model';

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

  public static createMany(playdataVSDaoList: PlaydataVS[]) {
    return playdataVSDaoList.map((playdataVSDao) => {
      return new VSEntity({
        chartIdx: playdataVSDao.chartIdx,
        playdata: playdataVSDao.playdata.score ? playdataVSDao.playdata : null,
        rivalPlaydata: playdataVSDao.rivalPlaydata.score
          ? playdataVSDao.rivalPlaydata
          : null,
      });
    });
  }
}
