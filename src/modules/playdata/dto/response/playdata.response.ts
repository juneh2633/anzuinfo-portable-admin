import { User } from 'src/modules/auth/model/user.model';

export class PlaydataDto {
  data: any | any[];
  authStatus: 'expired' | 'false' | 'true';
  constructor(datas: any) {
    Object.assign(this, datas);
  }

  static createResponse(user: User, data: any): PlaydataDto {
    return new PlaydataDto({
      data: data,
      authStatus: PlaydataDto.setAuthState(user !== null ? user.rankIdx : 0),
    });
  }
  private static setAuthState(rankInd: number): 'expired' | 'false' | 'true' {
    if (rankInd === -1) {
      return 'expired';
    }
    if (rankInd === 0) {
      return 'false';
    }

    return 'true';
  }
}
