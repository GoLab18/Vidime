import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (req.url.includes('/auth/')) return next(req);

  const authReq = addTokenToRequest(req, authService.token);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newReq = addTokenToRequest(req, authService.token);
            
            return next(newReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(['/auth']);

            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

function addTokenToRequest(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (!token) return request;
  
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
