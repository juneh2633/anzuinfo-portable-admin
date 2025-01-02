import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NullResponseDto } from 'src/common/dto/null-response.dto';
@ApiTags('Healthcheck API')
@Controller('healthcheck')
export class HealthcheckController {
  /**
   * healthcheck
   */
  @Get('/')
  async healthcheck(): Promise<NullResponseDto> {
    return new NullResponseDto();
  }
}
