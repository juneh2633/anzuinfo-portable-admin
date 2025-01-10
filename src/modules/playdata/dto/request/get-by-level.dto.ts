import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetByLevelDto {
  @Type(() => Number)
  @Min(1)
  @Max(20)
  @ApiProperty({
    description: '채보 레벨',
    default: 18,
    minimum: 1,
    maximum: 20,
  })
  level: number;
}
