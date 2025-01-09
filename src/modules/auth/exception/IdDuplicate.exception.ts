import { HttpException, HttpStatus } from '@nestjs/common';

export class IdDuplicateException extends HttpException {
  constructor() {
    super('id already exist', 4091);
  }
}
