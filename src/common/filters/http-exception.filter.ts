import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Response } from '../interceptors/response.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response =
      ctx.getResponse<ExpressResponse<Response<undefined, unknown>>>();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      meta: {
        code: statusCode,
        message: exception.message,
        success: false,
      },
      error: exception.cause,
    });
  }
}
