import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/request/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/response/token.dto';
import { SignUpDto } from './dto/request/sign-up.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';
import { User } from './model/user.model';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { IdDuplicateException } from './exception/IdDuplicate.exception';
import { SVDuplicateException } from './exception/SVDuplicate.exception';
import { GetSdvxIdDto } from './dto/request/get-sdvx-id.dto';
import { GetPwDto } from './dto/request/get-pw.dto';
import { PwNotMatchException } from './exception/PwNotMatch.exception';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   */
  @Post('/login')
  @ExceptionList([new UnauthorizedException('login fail')])
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
  async signUp(@Body() signUpDto: SignUpDto): Promise<NullResponseDto> {
    await this.authService.signUp(signUpDto);

    return new NullResponseDto();
  }

  /**
   * 회원탈퇴
   */
  @Delete('/')
  @AuthCheck(1)
  async withdrawAccount(@GetUser() user: User): Promise<NullResponseDto> {
    await this.authService.withdraw(user);

    return new NullResponseDto();
  }
  /**
   * sv데이터 수정
   */
  @Put('/sv')
  @AuthCheck(1)
  @ExceptionList([])
  async changeSV(
    @GetUser() user: User,
    @Body() getSdvxIdDto: GetSdvxIdDto,
  ): Promise<NullResponseDto> {
    await this.authService.amendSV(getSdvxIdDto, user);

    return new NullResponseDto();
  }

  /**
   * pw 수정
   */
  @Put('/pw')
  @AuthCheck(1)
  @ExceptionList([new PwNotMatchException()])
  async changePw(
    @GetUser() user: User,
    @Body() getPwDto: GetPwDto,
  ): Promise<NullResponseDto> {
    await this.authService.amendPW(getPwDto, user);

    return new NullResponseDto();
  }
}
