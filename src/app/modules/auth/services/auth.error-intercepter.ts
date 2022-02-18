import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { AppStorage } from '../../shared/utilities/app-storage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  router: any;
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let refreshTokenRequest = null;

    return next.handle(request).pipe(
      catchError((response) => {
        // console.log(response.headers.get('token-expired'));
        if (response.headers.get('token-expired')) {

          var refreshToken = AppStorage.getTokenData('refreshToken');

          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : this.authenticationService.refresh(refreshToken);

          refreshTokenRequest = null;
        }

        const error = response.error.message || response.statusText;
        return throwError(error);
      })
    );
  }
}
