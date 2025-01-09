import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AccountWriteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(id: string, pw: string, sdvxId: string): Promise<void> {
    await this.prismaService.account.create({
      data: {
        id: id,
        pw: pw,
        sdvxId: sdvxId,
        createdAt: new Date(),
      },
    });
  }
  async softDeleteAccount(userIdx: number): Promise<void> {
    await this.prismaService.account.update({
      where: { idx: userIdx },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateAccountSV(userIdx: number, sdvxId: string): Promise<void> {
    await this.prismaService.account.update({
      where: { idx: userIdx },
      data: {
        sdvxId: sdvxId,
      },
    });
  }
}
