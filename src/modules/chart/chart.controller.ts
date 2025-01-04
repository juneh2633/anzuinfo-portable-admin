import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ExceptionList } from 'src/common/decorator/exception-list.decorator';
import { ChartDto } from './dto/response/chart.reponse.dto';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

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
