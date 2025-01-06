import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SignInDto } from './dto/request/auth.dto';
import { compareSync, hashSync } from 'bcrypt';
import { SignUpDto } from './dto/request/sign-up.dto';
import { User } from './model/user.model';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
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
      playCount: account.playCount,
      createdAt: account.createdAt,
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const [accountCheck] = await Promise.all([
      this.prisma.account.findFirst({
        where: { id: signUpDto.id, deletedAt: null },
      }),
    ]);

    if (accountCheck) {
      throw new ConflictException('id duplicate');
    }

    await this.prisma.account.create({
      data: {
        pw: hashSync(signUpDto.password, 1),
        id: signUpDto.id,
      },
    });
  }

  async withdraw(user: User) {
    const now = Date();
    await this.prisma.account.update({
      where: { idx: user.idx },
      data: {
        deletedAt: now,
      },
    });
  }
}
