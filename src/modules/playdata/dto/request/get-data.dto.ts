import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetDataDto {
  @IsString()
  @ApiProperty({
    description: '유저 정보',
    default: 'juneh2633',
  })
  user: string;

  @IsArray()
  @ApiProperty({
    description: '플레이 데이터 리스트',
  })
  tracks: string[];
}
