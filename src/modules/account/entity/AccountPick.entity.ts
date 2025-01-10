import { Account } from '@prisma/client';

export class AccountPickEntity {
  idx: number;
  sdvxId: string;
  playerName: string;
  playCount: number;
  vf: number;
  skillLevel: String;
  updateAt: number;
  createdAt: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(account: Account) {
    return new AccountPickEntity({
      idx: account.idx,
      sdvxId: account.sdvxId,
      playerName: account.playerName,
      playCount: account.playCount,
      vf: account.vf,
      skillLevel: account.createdAt,
      updateAt: account.updateAt,
      createdAt: account.createdAt,
    });
  }
}
