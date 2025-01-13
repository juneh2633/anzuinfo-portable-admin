import { ChartWithRadarEntity } from '../../entity/ChartWithRadar.entity';

export class ChartResponseDto {
  data: ChartWithRadarEntity | ChartWithRadarEntity[];
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: any) {
    return new ChartResponseDto({
      data: data,
    });
  }
}
