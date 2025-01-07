import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaydataService } from './playdata.service';
import { ApiTags } from '@nestjs/swagger';
import { GetDataDto } from './dto/request/get-data.dto';
import { NullResponseDto } from 'src/common/dto/null-response.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthCheck } from 'src/common/decorator/auth-check.decorator';
import { User } from '../auth/model/user.model';
import { PlaydataDto } from './dto/response/playdata.response';

@ApiTags('Playdata API')
@Controller('playdata')
export class PlaydataController {
  constructor(private readonly playdataService: PlaydataService) {}

  //   @Post('/')
  //   async inputPlaydata(@Body() getDataDto:GetDataDto) {
  //       const
  //   }

  @Post('/')
  async inputPlaydata(@Body() getDataDto: GetDataDto) {
    await this.playdataService.postData(getDataDto);
    return { status: 'success', message: 'Data received successfully' };
  }

  @Get('/volforce')
  @AuthCheck(1)
  async findVolforce(@GetUser() user: User): Promise<PlaydataDto> {
    const data = await this.playdataService.getVFTable(user.idx);
    return PlaydataDto.createResponse(user, data);
  }
}
