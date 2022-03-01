import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { RefreshTokenRequest } from "../../shared/models/refreshtoken-request";
import { AuthenticatedRespone } from "../../shared/models/user.model";
import { SharedService } from "../../shared/services/shared.services";
import { AppStorage } from "../../shared/utilities/app-storage";


@Injectable()
export class RefresshTokenInterceptor implements HttpInterceptor{
	private isRefreshing: boolean = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    /**
     *
     */
    constructor(private service: SharedService) {   
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error) => {
			const errorResponse = error as HttpErrorResponse;
            const isTokenExpired = errorResponse.status === 401 && "true" === errorResponse.headers?.get("Token-Expired")?.toLowerCase();
            if (isTokenExpired) {
                return this.handleTokenRefreshing(request, next);
            }
			return this.handleRequestError(error, errorResponse);      
        }));
	}

    private handleTokenRefreshing(request: HttpRequest<any>, next: HttpHandler) {
		// Call API to refresh token
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			const refreshTokenRequest : RefreshTokenRequest = {
					token: AppStorage.getTokenData('accessToken'),
					refreshToken: AppStorage.getTokenData('refreshToken'),
			};
            // const refreshToken = AppStorage.getTokenData('refreshToken');
            // const token = AppStorage.getTokenData('accessToken');

			return this.service.refreshToken<AuthenticatedRespone>(refreshTokenRequest).pipe(
                switchMap(response =>{

					this.isRefreshing = false;
                    AppStorage.removeItem('accessToken');
                    AppStorage.removeItem('accessToken');
                    AppStorage.storeTokenData('accessToken', response.accessToken);
                    AppStorage.storeTokenData('refreshToken', response.refreshToken);

					this.refreshTokenSubject.next(response);

					return next.handle(this.updateRequestAuthorizationHeader(request));
                }),
                catchError(error=>{
                    return throwError(() => error);
                })
            )		
		} else {
			// Waiting for response from refresh token request
			return this.refreshTokenSubject. pipe(
				filter(token => token != null),
				take(1),
				switchMap((_jwt: { accessToken: string, refreshToken: string }) => next.handle(this.updateRequestAuthorizationHeader(request))));
		}
	}

    private updateRequestAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
        // To make changes we need to clone the Original request
		return request.clone({
			setHeaders: {
				Authorization: this.service.headerAuthorizationKey
			}
		});
	}

    
	private handleRequestError(originError: any, httpResponseError: HttpErrorResponse) {
		// 401: Unauthorized
		if (httpResponseError.status === 401) {
			// this.store.dispatch(new Logout());
            console.log("handleRequestError: 401");
            
		} else if (httpResponseError.status === 403) {
			// 403: Forbidden
			// this.store.dispatch(new ForbiddenRedirect());
            console.log("handleRequestError: 403");
		}
		return throwError(() => originError);
	}

}