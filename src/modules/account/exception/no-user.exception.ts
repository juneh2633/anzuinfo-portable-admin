import { HttpException, HttpStatus } from '@nestjs/common';

export class NoUserException extends HttpException {
  constructor() {
    super('no User', 404);
  }
}
