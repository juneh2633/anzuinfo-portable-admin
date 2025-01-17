import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/request/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/response/token.dto';
import { SignUpDto } from './dto/request/sign-up.dto';
import { SuccessResponseDto } from 'src/common/dto/Success-response.dto';
import { User } from './model/user.model';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { IdDuplicateException } from './exception/IdDuplicate.exception';
import { SVDuplicateException } from './exception/SVDuplicate.exception';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { GetPwDto } from './dto/request/get-pw.dto';
import { LoginFailException } from './exception/LoginFail.exception';
import { versionData } from 'src/common/lib/version-data';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   */
  @Post('/login')
  @ExceptionList([new LoginFailException()])
  async signIn(@Body() signInDto: SignInDto): Promise<TokenResponseDto> {
    const accessToken = await this.authService.signIn(signInDto);

    return {
      accessToken: accessToken,
    };
  }

  /**
   * 회원가입
   */
  @Post('/')
  @ExceptionList([new IdDuplicateException(), new SVDuplicateException()])
  async signUp(@Body() signUpDto: SignUpDto): Promise<SuccessResponseDto> {
    await this.authService.signUp(signUpDto);

    return new SuccessResponseDto();
  }

  /**
   * 회원탈퇴
   */
  @Delete('/')
  @AuthCheck(1)
  async withdrawAccount(@GetUser() user: User): Promise<SuccessResponseDto> {
    await this.authService.withdraw(user);

    return new SuccessResponseDto();
  }
  /**
   * sv데이터 수정
   */
  @Patch('/sv')
  @AuthCheck(1)
  @ExceptionList([])
  async changeSV(
    @GetUser() user: User,
    @Body() getSdvxIdDto: GetSdvxIdDto,
  ): Promise<SuccessResponseDto> {
    await this.authService.amendSV(getSdvxIdDto, user);

    return new SuccessResponseDto();
  }

  /**
   * pw 수정
   */
  @Patch('/pw')
  @AuthCheck(1)
  @ExceptionList([])
  async changePw(
    @GetUser() user: User,
    @Body() getPwDto: GetPwDto,
  ): Promise<SuccessResponseDto> {
    await this.authService.amendPW(getPwDto, user);

    return new SuccessResponseDto();
  }
}
