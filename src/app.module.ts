import { Module } from '@nestjs/common';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    //AuthModule,
    HealthcheckModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
