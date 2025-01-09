import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from '../auth/model/user.model';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * sv 존재여부 확인
   */
  @Post('/check')
  async checkUser(@Body() getSdvxIdDto: GetSdvxIdDto) {
    console.log(getSdvxIdDto);
    await this.accountService.findUser(getSdvxIdDto);
    return NullResponseDto;
  }
}
