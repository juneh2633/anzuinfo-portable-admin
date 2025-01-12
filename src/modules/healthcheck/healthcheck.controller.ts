import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/Success-response.dto';
@ApiTags('Healthcheck API')
@Controller('healthcheck')
export class HealthcheckController {
  /**
   * healthcheck
   */
  @Get('/')
  async healthcheck(): Promise<SuccessResponseDto> {
    return new SuccessResponseDto();
  }
}
