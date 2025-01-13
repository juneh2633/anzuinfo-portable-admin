import { Account, Chart, Playdata, Song } from '@prisma/client';
import { PlaydataUser } from '../model/playdata-user.model';

export class PlaydataWithUserEntity {
  chartIdx: number;
  score: number;
  rank: number;
  chartVf: number;
  account: {
    idx: number;
    sdvxId: string;
    playerName: string;
    skillLevel: string;
    vf: number;
  };
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(playdataDao: PlaydataUser) {
    return new PlaydataWithUserEntity({
      chartIdx: playdataDao.chartIdx,
      score: playdataDao.score,
      rank: playdataDao.rank,
      chartVf: playdataDao.chartVf,
      account: {
        idx: playdataDao.account.idx,
        sdvxId: playdataDao.account.sdvxId,
        playerName: playdataDao.account.playerName,
        skillLevel: playdataDao.account.skillLevel,
        vf: playdataDao,
      },
    });
  }

  public static createMany(playdataDaoList: PlaydataUser[]) {
    return playdataDaoList.map((playdataDao) => {
      return PlaydataWithUserEntity.createDto(playdataDao);
    });
  }
}
