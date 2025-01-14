import { Genre } from '@prisma/client';

export class VersionEntity {
  version: string;
  constructor(data: any) {
    Object.assign(this, data);
  }
  public static createDto(version: string) {
    return new VersionEntity({
      version: version,
    });
  }
}
