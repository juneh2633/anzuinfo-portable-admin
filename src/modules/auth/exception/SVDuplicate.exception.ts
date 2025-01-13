import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'src/common/lib/error-code';

export class SVDuplicateException extends HttpException {
  constructor() {
    super('SV already exist ', ErrorCodes.SV_DUPLICATE);
  }
}
