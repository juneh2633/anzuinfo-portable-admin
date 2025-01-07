import { Prisma } from '@prisma/client';

export type PlaydataWithChartAndSong = Prisma.PlaydataGetPayload<{
  include: {
    chart: {
      include: {
        song: true;
      };
    };
  };
}>;
