import { Module } from '@nestjs/common';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChartModule } from './modules/chart/chart.module';
import { PlaydataModule } from './modules/playdata/playdata.module';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HealthcheckModule,
    ChartModule,
    PlaydataModule,
    AccountModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
