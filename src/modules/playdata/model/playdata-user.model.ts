import { Prisma } from '@prisma/client';

export type PlaydataUser = Prisma.PlaydataGetPayload<{
  include: {
    account: {
      select: {
        idx: true;
        sdvxId: true;
        playerName: true;
        skillLevel: true;
        updateAt: true;
        vf: true;
      };
    };
  };
}>;
