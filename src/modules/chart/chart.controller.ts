import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { ChartDto } from './dto/response/chart.reponse.dto';
import { SuccessResponseDto } from 'src/common/dto/Success-response.dto';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}
  /**
   * chartIdx캐싱
   */
  @AuthCheck(2)
  @Get('/cache')
  @ExceptionList([])
  async cacheChart() {
    const chart = await this.chartService.cacheChart();
    return new SuccessResponseDto();
  }

  /**
   * idx로 chart 데이터 가저오기
   */
  @Get('/:chartIdx')
  @ExceptionList([])
  async findChartByIdx(@Param('chartIdx', ParseIntPipe) chartIdx: number) {
    const chart = await this.chartService.findChartByIdx(chartIdx);
    return ChartDto.createResponse(chart);
  }
}
