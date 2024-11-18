import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const income = Date.now()
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const elapse_time = Date.now()-income
    console.log('Request:', {
      method: request.method,
      url: request.url,
      headers: request.headers,
      elapse_time: `${elapse_time}ms`,
    });

    return next.handle().pipe(
      tap((data) => {
        console.log('Response:', {
          statusCode: response.statusCode,
          data,
          elapse_time: `${elapse_time}ms`,
        });
      }),

      catchError((error) => {
        console.error('Error:', error, `After ${elapse_time}ms`);
        throw error;
      })
    );
  }
}
