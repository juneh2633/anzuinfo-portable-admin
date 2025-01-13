import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

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
  pw: string;

  @IsString()
  @Matches(/^SV-\d{4}-\d{4}$/, {
    message: 'sdvxId must follow the format "SV-XXXX-XXXX" where X is a digit',
  })
  @ApiProperty({
    description: '사볼 sv번호',
    default: 'SV-5264-9170',
  })
  sdvxId: string;
}
