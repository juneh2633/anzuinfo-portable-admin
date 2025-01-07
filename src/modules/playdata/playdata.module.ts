import { Module } from '@nestjs/common';
import { PlaydataService } from './playdata.service';
import { PlaydataController } from './playdata.controller';
import { RedisModule } from 'src/common/redis/redis.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PlaydataRepository } from './repository/playdata.repository';
import { SongRepository } from './repository/song.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [RedisModule, PrismaModule, CommonModule],
  providers: [PlaydataService, PlaydataRepository, SongRepository],
  controllers: [PlaydataController],
})
export class PlaydataModule {}
