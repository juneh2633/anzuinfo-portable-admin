import { Injectable } from '@nestjs/common';
import { PlaydataRepository } from './repository/playdata.repository';
import { GetDataDto } from './dto/request/get-data.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SongRepository } from './repository/song.repository';

@Injectable()
export class PlaydataService {
  constructor(
    private readonly playdataRepository: PlaydataRepository,
    private readonly songRepository: SongRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async postData(getDataDto: GetDataDto) {
    const userData = getDataDto.user;
    const accountIdx = 1;
    const songList = this.songRepository.findSongList();
    await this.prismaService.$transaction(async (prisma) => {
      const playdataList = getDataDto.tracks.map((track) => {
        const [title, type, status, score] = track.split('\t');
        if (title === 'Prayer') {
        } else {
          //   return this.playdataRepository.insertPlaydata(accountIdx,);
        }
      });

      await Promise.all(playdataList);
    });
  }
}
