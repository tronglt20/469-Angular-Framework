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
import { SharedService } from '../../shared/services/shared.services';
import { AuthenticatedRespone } from '../../shared/models/user.model';
import { AppStorage } from '../../shared/utilities/app-storage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  router: any;
  constructor(
    private authenticationService: AuthenticationService,
    private service: SharedService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let refreshTokenRequest = null;

    return next.handle(request).pipe(
      catchError((response) => {
        if (
          response.status === 401 &&
          response.error == 'The access token provided has expired.'
        ) {
          if (request.headers.has('Authorization')) {
            request.headers.delete('Authorization');
          }

          var refreshToken = AppStorage.getTokenData('refreshToken');

          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : this.authenticationService.refresh(refreshToken);

          refreshTokenRequest?.subscribe({
            next: (result) => {
              console.log('refresh success');
              this.router.navigate(['/home']);
              location.reload();
            },
            error: (error) => {
              console.log(error);
            },
          });

          refreshTokenRequest = null;
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
          // location.reload();
        }

        const error = response.error.message || response.statusText;
        return throwError(error);
      })
    );
  }
}
