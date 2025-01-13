import { Genre, Song } from '@prisma/client';

export class SongEntity {
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
  genre: number;
  date: Date;
  konaste: boolean;
  constructor(data: any) {
    Object.assign(this, data);
  }

  public static createDto(songDao: Song, genreDao: Genre) {
    return new SongEntity({
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
      genre: genreDao.genreIdx,
      date: songDao.date,
      konaste: songDao.konaste,
    });
  }
}
