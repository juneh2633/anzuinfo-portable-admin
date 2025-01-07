import { Module } from '@nestjs/common';
import { PlaydataService } from './playdata.service';
import { PlaydataController } from './playdata.controller';
import { RedisModule } from 'src/common/redis/redis.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PlaydataRepository } from './repository/playdata.repository';
import { SongRepository } from './repository/song.repository';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [PlaydataService, PlaydataRepository, SongRepository],
  controllers: [PlaydataController],
})
export class PlaydataModule {}
