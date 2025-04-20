import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response as ExpressResponse } from 'express';
import { ApiResponse, Response } from '../interfaces/response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<ApiResponse<T>, Response<T, undefined>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ):
    | Observable<Response<T, undefined>>
    | Promise<Observable<Response<T, undefined>>> {
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    const code = response.statusCode;

    return next.handle().pipe(
      map((res) => ({
        meta: {
          message: res.message,
          code,
          success: true,
        },
        data: res.data,
      })),
    );
  }
}
