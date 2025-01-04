import { ChartWithRadarEntity } from '../../entity/ChartWithRadar.entity';

export class ChartDto {
  data: ChartWithRadarEntity | ChartWithRadarEntity[];
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: any) {
    return new ChartDto({
      data: data,
    });
  }
}
