import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { SuccessResponseDto } from 'src/common/dto/Success-response.dto';
import { NoChartException } from './exception/no-chart.exception';
import { GetVersionDto } from './dto/request/get-version.dto';
import { VersionResponseDto } from './dto/response/version.response.dto';
import { MetaResponseDto } from './dto/response/meta.response.dto';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}
  /**
   * chartIdx캐싱
   */
  @Get('/cache')
  @ExceptionList([])
  async cacheChart() {
    const chart = await this.chartService.cacheChart();
    return new SuccessResponseDto();
  }

  /**
   * 곡 전체 가저오기(swagger 사용금지)
   */
  @Get('/meta')
  @ExceptionList([new NoChartException()])
  async getSongALl(): Promise<MetaResponseDto> {
    const data = await this.chartService.findSongAllByRedis();
    return data;
  }

  /**
   * 메타 데이터 캐싱
   */
  @Post('/meta')
  @ExceptionList([new NoChartException()])
  async setSongALl(): Promise<SuccessResponseDto> {
    await this.chartService.cacheSongAll();
    return new SuccessResponseDto();
  }

  /**
   * 버전 확인
   */
  @Get('/version')
  @ExceptionList([])
  async getVersion(): Promise<VersionResponseDto> {
    const data = await this.chartService.findVersion();
    return VersionResponseDto.createResponse(data);
  }

  /**
   * 버전 번호 변경
   */
  @Put('/version')
  @ExceptionList([])
  async setVersion(
    @Query() getVersionDto: GetVersionDto,
  ): Promise<SuccessResponseDto> {
    const data = await this.chartService.insertVersion(getVersionDto.version);
    return new SuccessResponseDto();
  }

  /**
   * 곡 추가
   */
  @Post('/song')
  @ExceptionList([new NoChartException()])
  async setSong(): Promise<SuccessResponseDto> {
    await this.chartService.insertSong();
    return new SuccessResponseDto();
  }
}
