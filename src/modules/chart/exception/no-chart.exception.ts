import { HttpException, HttpStatus } from '@nestjs/common';

export class NoChartException extends HttpException {
  constructor() {
    super('no chart', 404);
  }
}
