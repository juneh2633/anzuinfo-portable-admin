import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class GetVSDto {
  @IsString()
  @ApiProperty({
    description: '상대 아이디',
    default: 'juneh2633',
  })
  rivalId: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: '페이지 (1부터)',
    default: 1,
  })
  page: number;
}
