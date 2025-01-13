import { HttpException } from '@nestjs/common';
import { ErrorCodes } from 'src/common/lib/error-code';

export class NoUserException extends HttpException {
  constructor() {
    super('no User', ErrorCodes.NO_USER);
  }
}
