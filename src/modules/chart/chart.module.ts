import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { RadarRepository } from './repository/radar.repository';
import { ChartRepository } from './repository/chart.repository';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [ChartController],
  providers: [ChartService, RadarRepository, ChartRepository],
})
export class ChartModule {}
