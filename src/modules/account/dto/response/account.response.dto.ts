import { AccountPickEntity } from '../../entity/AccountPick.entity';

export class AccountResponseDto {
  data: AccountPickEntity;
  constructor(data: any) {
    Object.assign(this, data);
  }

  static createResponse(data: any) {
    return new AccountResponseDto({
      data: data,
    });
  }
}
