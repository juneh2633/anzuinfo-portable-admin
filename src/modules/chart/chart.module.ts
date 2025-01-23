import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ChartRepository } from './repository/chart.repository';
import { RedisModule } from 'src/common/redis/redis.module';
import { SongRepository } from './repository/song.repository';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [ChartController],
  providers: [ChartService, ChartRepository, SongRepository],
})
export class ChartModule {}
