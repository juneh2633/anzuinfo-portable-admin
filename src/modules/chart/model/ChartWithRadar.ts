import { Prisma } from '@prisma/client';

export type ChartWithRadar = Prisma.ChartGetPayload<{
  include: {
    radar: true;
  };
}>;
