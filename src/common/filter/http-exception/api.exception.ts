/*
 * @Description:
 * @Date: 2023-05-10 13:52:41
 * @Author: didi
 * @LastEditTime: 2023-05-10 14:29:18
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../enums/api-error-code.enum';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiErrorCode;

  constructor(
    errorMessage: string,
    errorCode: ApiErrorCode,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
