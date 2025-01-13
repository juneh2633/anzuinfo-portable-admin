import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'src/common/lib/error-code';

export class IdDuplicateException extends HttpException {
  constructor() {
    super('id already exist', ErrorCodes.ID_DUPLICATE);
  }
}
