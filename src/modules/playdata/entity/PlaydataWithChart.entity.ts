import { Chart, Playdata, Song } from '@prisma/client';

export class PlaydataWithChartEntity {
  chartIdx: number;
  songIdx: number;
  title: string;
  level: number;
  type: string;
  jacket: string;
  score: number;
  rank: number;
  chartVf: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(
    chartDao: Chart,
    songDao: Song,
    playdataDao: Playdata,
  ) {
    return new PlaydataWithChartEntity({
      chartIdx: chartDao.idx,
      songIdx: chartDao.songIdx,
      level: chartDao.level,
      type: chartDao.type,
      jacket: chartDao.jacket,
      title: songDao.title,
      score: playdataDao.score,
      rank: playdataDao.rank,
      chartVf: playdataDao.chartVf,
    });
  }
}
