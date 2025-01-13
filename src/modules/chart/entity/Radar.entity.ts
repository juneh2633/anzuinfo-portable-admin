import { Radar } from '@prisma/client';

export class RadarEntity {
  notes: number;
  peak: number;
  tsumami: number;
  tricky: number;
  handtrip: number;
  onehand: number;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(radarDao: Radar) {
    return new RadarEntity({
      notes: radarDao.notes,
      peak: radarDao.peak,
      tsumami: radarDao.tsumami,
      tricky: radarDao.tricky,
      handtrip: radarDao.handtrip,
      onehand: radarDao.onehand,
    });
  }
}
