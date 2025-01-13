import { ChartWithRadarEntity } from '../../entity/ChartWithRadar.entity';
import { VersionEntity } from '../../entity/Version.entity';

export class VersionResponseDto {
  version: string;
  check: boolean;
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: VersionEntity) {
    return new VersionResponseDto({
      version: data.version,
      check: data.check,
    });
  }
}
