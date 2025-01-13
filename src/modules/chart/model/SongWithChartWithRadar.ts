import { Prisma } from '@prisma/client';

export type SongWithChartWithRadar = Prisma.SongGetPayload<{
  include: {
    chart: {
      include: {
        radar: true;
      };
    };
  };
}>;
