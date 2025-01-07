import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { ChartDto } from './dto/response/chart.reponse.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get('/cache')
  @ExceptionList([])
  async cacheChart() {
    const chart = await this.chartService.cacheChart();
    return new NullResponseDto();
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
