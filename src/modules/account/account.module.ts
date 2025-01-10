import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { AccountRepository } from './repository/account.repository';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AccountController],
  providers: [AccountRepository, AccountService],
  exports: [AccountRepository, AccountService],
})
export class AccountModule {}
