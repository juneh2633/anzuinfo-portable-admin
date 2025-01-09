import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty({
    description: '로그인 아이디',
    default: 'juneh2633',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: '로그인 비밀번호',
  })
  pw: string;
}
