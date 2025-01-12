import { HttpException, HttpStatus } from '@nestjs/common';

export class SVDuplicateException extends HttpException {
  constructor() {
    super('SV already exist ', 409);
  }
}
