import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @ApiProperty({
    description: '회원가입 아이디',
    default: 'juneh2633',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: '회원가입 비밀번호',
    default: 'asdf1234',
  })
  password: string;
}
