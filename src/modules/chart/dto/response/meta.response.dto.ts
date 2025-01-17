import { ChartWithRadarEntity } from '../../entity/ChartWithRadar.entity';

export class MetaResponseDto {
  data: ChartWithRadarEntity | ChartWithRadarEntity[];
  version: any;
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: any, version: any) {
    return new MetaResponseDto({
      data: data,
      version: version,
    });
  }
}
