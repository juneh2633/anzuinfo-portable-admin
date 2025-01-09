import { Injectable } from '@nestjs/common';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { AccountRepository } from './repository/account.repository';
import { NoUserException } from './exception/no-user.exception';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findUser(getSdvxIdDto: GetSdvxIdDto): Promise<void> {
    const account = await this.accountRepository.selectAccountBySdvxId(
      getSdvxIdDto.sdvxId,
    );
    if (account === null) {
      throw new NoUserException();
    }
  }
}
