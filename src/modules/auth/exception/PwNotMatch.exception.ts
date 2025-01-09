import { HttpException, HttpStatus } from '@nestjs/common';

export class PwNotMatchException extends HttpException {
  constructor() {
    super('password and passwordCheck not match', 400);
  }
}
