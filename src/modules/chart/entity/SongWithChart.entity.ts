import { Chart, Genre, Radar, Song } from '@prisma/client';
import { ChartWithRadarEntity } from './ChartWithRadar.entity';
import { SongWithChartWithRadar } from '../model/SongWithChartWithRadar';

export class SongWithChartEntity {
  songIdx: number;
  title: string;
  artist: string;
  ascii: string;
  asciiTitle: string;
  asciiArtist: string;
  titleYomigana: string;
  artistYomigana: string;
  version: number;
  mainBpm: number | null;
  bpm: string;
  genreTxt: string;
  date: Date;
  konaste: boolean;
  chart: ChartWithRadarEntity[];
  constructor(data: any) {
    Object.assign(this, data);
  }

  public static createDto(songDao: SongWithChartWithRadar) {
    return new SongWithChartEntity({
      songIdx: songDao.idx,
      title: songDao.title,
      artist: songDao.artist,
      ascii: songDao.ascii,
      asciiTitle: songDao.asciiTitle,
      asciiArtist: songDao.asciiArtist,
      titleYomigana: songDao.titleYomigana,
      artistYomigana: songDao.artistYomigana,
      version: songDao.version,
      mainBpm: songDao.mainBpm,
      bpm: songDao.bpm,
      genreTxt: songDao.genreTxt,
      date: songDao.date,
      konaste: songDao.konaste,
      chart: ChartWithRadarEntity.createDtoMany(songDao.chart),
    });
  }
  public static createMany(songDaoList: any[]) {
    return songDaoList.map((songDao) => {
      return new SongWithChartEntity({
        songIdx: songDao.idx,
        title: songDao.title,
        artist: songDao.artist,
        ascii: songDao.ascii,
        asciiTitle: songDao.asciiTitle,
        asciiArtist: songDao.asciiArtist,
        titleYomigana: songDao.titleYomigana,
        artistYomigana: songDao.artistYomigana,
        version: songDao.version,
        mainBpm: songDao.mainBpm,
        bpm: songDao.bpm,
        genreTxt: songDao.genreTxt,
        date: songDao.date,
        konaste: songDao.konaste,
        chart: ChartWithRadarEntity.createDtoMany(songDao.chart),
      });
    });
  }
}
