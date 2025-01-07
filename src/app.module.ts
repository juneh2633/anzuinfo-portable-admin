import { Module } from '@nestjs/common';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChartModule } from './modules/chart/chart.module';
import { PlaydataModule } from './modules/playdata/playdata.module';

@Module({
  imports: [AuthModule, HealthcheckModule, ChartModule, PlaydataModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
