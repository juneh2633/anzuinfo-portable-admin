import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetVSDto {
  @IsString()
  @ApiProperty({
    description: '상대 아이디',
    default: 'juneh2633',
  })
  livalId: string;
}
