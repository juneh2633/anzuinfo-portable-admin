import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class GetPwDto {
  @IsString()
  @ApiProperty({
    description: '회원가입 비밀번호',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: '회원가입 비밀번호 체크',
  })
  passwordCheck: string;
}
