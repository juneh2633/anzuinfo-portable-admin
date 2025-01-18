import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  @ApiProperty({
    description: 'clearRank 필터',
    default: [0, 1, 2, 3],
  })
  clearRankFilter?: number[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  @ApiProperty({
    description: 'score 필터',
    default: [0, 1, 2, 3],
  })
  scoreFilter?: number[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  @ApiProperty({
    description: 'level 필터',
    default: [18, 19, 20],
  })
  levelFilter?: number[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '검색어',
    default: 'lachryma',
  })
  keyword?: string;
}
