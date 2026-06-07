import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, combineLatest, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AppService } from '../services/app.service';

export const ApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const appService = inject(AppService);
  return combineLatest([
    appService.jwt$
  ]).pipe(
    take(1),
    switchMap(([jwt]) => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return next(authReq);
    }),
    catchError((err: HttpErrorResponse) => {
      appService.errorMessage.set(err);
      return throwError(() => err);
    })
  )
};
