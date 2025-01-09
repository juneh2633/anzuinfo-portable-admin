import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

import jwtConfig from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { AccountModule } from '../account/account.module';
import { AccountWriteRepository } from './repository/account-write.repository';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
    PrismaModule,
    AccountModule,
  ],
  providers: [AuthService, TokenService, AccountWriteRepository],
  controllers: [AuthController],
  exports: [TokenService],
})
export class AuthModule {}
