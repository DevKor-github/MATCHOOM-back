import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    console.log('Request:', {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });

    return next.handle().pipe(
      tap((data) => {
        console.log('Response:', {
          statusCode: response.statusCode,
          data,
        });
      }),

      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
