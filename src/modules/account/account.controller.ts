import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/check')
  async checkUser(@Body() getSdvxIdDto: GetSdvxIdDto) {
    console.log(getSdvxIdDto);
    await this.accountService.findUser(getSdvxIdDto);
    return NullResponseDto;
  }
}
