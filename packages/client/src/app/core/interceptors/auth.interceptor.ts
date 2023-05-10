import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RefreshAccessTokenReply } from '@tfab/shared';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingAccessToken = false;

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && !this.isRefreshingAccessToken) {
      const accessTokenReqeust = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(accessTokenReqeust).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
              this.authService.localLogout();
              return throwError(() => error);
            }

            return this.handle401Error(request, next);
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshingAccessToken && this.authService.isLoggedIn) {
      this.isRefreshingAccessToken = true;

      return this.authService.refreshAccessToken().pipe(
        switchMap((reply: RefreshAccessTokenReply) => {
          this.authService.setAccessToken(reply.accessToken);
          this.isRefreshingAccessToken = false;
          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshingAccessToken = false;

          if (error.status === 403) {
            this.authService.localLogout();
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}
