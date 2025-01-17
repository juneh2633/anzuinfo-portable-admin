import { ChartWithRadarEntity } from '../../entity/ChartWithRadar.entity';

export class MetaResponseDto {
  data: ChartWithRadarEntity | ChartWithRadarEntity[];
  version: any;
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: any, meta: any) {
    return new MetaResponseDto({
      chartData: data,
      metaData: meta,
    });
  }
}
