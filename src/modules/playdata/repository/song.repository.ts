import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SongRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findSongList(): Promise<{ idx: number; title: string }[]> {
    const songList = this.prismaService.song.findMany({
      select: {
        idx: true,
        title: true,
      },
      orderBy: {
        idx: 'asc',
      },
    });
    return songList;
  }
}
