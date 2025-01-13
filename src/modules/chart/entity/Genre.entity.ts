import { Genre } from '@prisma/client';

export class GenreEntity {
  genreIdx: number;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(genreDao: Genre) {
    return new GenreEntity({
      genreIdx: genreDao.genreIdx,
    });
  }
}
