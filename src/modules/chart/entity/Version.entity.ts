import { Genre } from '@prisma/client';

export class VersionEntity {
  version: string;
  check: boolean;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(version: string, check: boolean) {
    return new VersionEntity({
      version: version,
      check: check,
    });
  }
}
