import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetSdvxIdDto {
  @IsString()
  @ApiProperty({
    description: 'sdvx id',
    default: 'SV-5264-9170',
  })
  sdvxId: string;
}
