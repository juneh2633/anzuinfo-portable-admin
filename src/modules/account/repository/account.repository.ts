import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AccountRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async selectAccountBySdvxId(sdvxId: string): Promise<Account | null> {
    const account = await this.prismaService.account.findFirst({
      where: {
        sdvxId: sdvxId,
      },
    });
    return account;
  }
}
