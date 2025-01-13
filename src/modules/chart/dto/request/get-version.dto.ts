import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class GetVersionDto {
  @IsString()
  @ApiProperty({
    description: '데이터 버전',
    default: '1.0.0',
  })
  version: string;
}
