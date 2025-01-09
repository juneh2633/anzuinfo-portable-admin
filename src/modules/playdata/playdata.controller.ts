import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PlaydataService } from './playdata.service';
import { ApiTags } from '@nestjs/swagger';
import { GetDataDto } from './dto/request/get-data.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';
import { User } from '../auth/model/user.model';
import { PlaydataDto } from './dto/response/playdata.response';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { NoPlaydataException } from './exception/no-playdata.exception';

@ApiTags('Playdata API')
@Controller('playdata')
export class PlaydataController {
  constructor(private readonly playdataService: PlaydataService) {}

  /**
   * 갱신코드 데이터 받는 api
   */
  @Post('/')
  async inputPlaydata(@Body() getDataDto: GetDataDto) {
    await this.playdataService.postData(getDataDto);
    return { status: 'success', message: 'Data received successfully' };
  }

  /**
   * 로그인 유저 볼포스
   */
  @Get('/volforce')
  @AuthCheck(1)
  async findVolforce(@GetUser() user: User): Promise<PlaydataDto> {
    const data = await this.playdataService.getVFTable(user.idx);
    return PlaydataDto.createResponse(user, data);
  }

  /**
   * 로그인 유저 차트 점수
   */
  @Get('/chart/:chartIdx')
  @ExceptionList([new NoPlaydataException()])
  @AuthCheck(1)
  async findPlaydataByChart(
    @GetUser() user: User,
    @Param('chartIdx') chartIdx: number,
  ): Promise<PlaydataDto> {
    const data = await this.playdataService.getPlaydataByChart(
      user.idx,
      chartIdx,
    );
    return PlaydataDto.createResponse(user, data);
  }
}
