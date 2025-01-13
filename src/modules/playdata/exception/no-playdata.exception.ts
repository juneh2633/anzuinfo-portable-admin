import { HttpException } from '@nestjs/common';
import { ErrorCodes } from 'src/common/lib/error-code';

export class NoPlaydataException extends HttpException {
  constructor() {
    super('no Playdata', ErrorCodes.NO_PLAYDATA);
  }
}
