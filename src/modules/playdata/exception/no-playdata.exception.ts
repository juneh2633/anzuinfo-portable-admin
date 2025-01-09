import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPlaydataException extends HttpException {
  constructor() {
    super('no Playdata', 404);
  }
}
