import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response as ExpressResponse } from 'express';

export interface Meta {
  message: string;
  code: number;
  success: 'success' | 'error';
}

export interface Response<T> {
  meta: Meta;
  data: T;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<ApiResponse<T>, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    const code = response.statusCode;

    return next.handle().pipe(
      map((res) => ({
        meta: {
          message: res.message,
          code,
          success: 'success',
        },
        data: res.data,
      })),
    );
  }
}
