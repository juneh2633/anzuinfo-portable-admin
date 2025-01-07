import { Chart, Playdata, Song } from '@prisma/client';

export class PlaydataWithChart {
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
    return new PlaydataWithChart({
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
