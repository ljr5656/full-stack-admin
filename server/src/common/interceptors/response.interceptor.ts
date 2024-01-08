// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        error: null, // Initialize error as null
      })),
      catchError((error) => {
        // Handle exceptions and add the error field to the response
        return throwError(() => {
          return {
            success: false,
            data: null,
            error: {
              message:
                error instanceof BadGatewayException
                  ? 'Bad Gateway'
                  : 'Internal Server Error',
              statusCode: error.getStatus(),
            },
          };
        });
      }),
    );
  }
}
