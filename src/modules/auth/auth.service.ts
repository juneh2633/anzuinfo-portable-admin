import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SignInDto } from './dto/request/auth.dto';
import { compareSync, hashSync } from 'bcrypt';
import { SignUpDto } from './dto/request/sign-up.dto';
import { User } from './model/user.model';
import { IdDuplicateException } from './exception/IdDuplicate.exception';
import { AccountRepository } from '../account/repository/account.repository';
import { SVDuplicateException } from './exception/SVDuplicate.exception';
import { AccountWriteRepository } from './repository/account-write.repository';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { GetPwDto } from './dto/request/get-pw.dto';
import { PwNotMatchException } from './exception/PwNotMatch.exception';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly accountRepository: AccountRepository,
    private readonly accountWriteRepository: AccountWriteRepository,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const account = await this.prisma.account.findFirst({
      where: { id: signInDto.id, deletedAt: null },
    });

    const passwordMatch = compareSync(signInDto.pw, account.pw);

    if (!account || !passwordMatch) {
      throw new UnauthorizedException('login fail');
    }

    return await this.jwtService.signAsync({
      idx: account.idx,
      id: account.id,
      vf: account.vf,
      rankIdx: 1,
      createdAt: account.createdAt,
      updateAt: account.updateAt,
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const [accountCheck, sdvxIdCheck] = await Promise.all([
      this.accountRepository.selectAccountById(signUpDto.id),
      this.accountRepository.selectAccountBySdvxId(signUpDto.sdvxId),
    ]);
    if (signUpDto.password !== signUpDto.passwordCheck) {
      throw new PwNotMatchException();
    }
    if (accountCheck) {
      throw new IdDuplicateException();
    }
    if (sdvxIdCheck) {
      throw new SVDuplicateException();
    }

    await this.accountWriteRepository.createAccount(
      signUpDto.id,
      hashSync(signUpDto.password, 1),
      signUpDto.sdvxId,
    );
  }
  async amendSV(getSdvxIdDto: GetSdvxIdDto, user: User): Promise<void> {
    await this.accountWriteRepository.updateAccountSV(
      user.idx,
      getSdvxIdDto.sdvxId,
    );
  }
  async amendPW(getPwDto: GetPwDto, user: User): Promise<void> {
    if (getPwDto.password !== getPwDto.passwordCheck) {
      throw new PwNotMatchException();
    }
    await this.accountWriteRepository.updateAccountPW(
      user.idx,
      hashSync(getPwDto.password),
    );
  }
  async withdraw(user: User) {
    await this.accountWriteRepository.softDeleteAccount(user.idx);
  }
}
