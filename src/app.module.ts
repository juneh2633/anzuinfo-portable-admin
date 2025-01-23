import { Module } from '@nestjs/common';

import { ChartModule } from './modules/chart/chart.module';

import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ChartModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
