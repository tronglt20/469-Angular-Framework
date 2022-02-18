import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthenticatedRespone } from '../models/user.model';
import { AppStorage } from '../utilities/app-storage';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'https://localhost:44396/api';

  get accessToken(): string {
    return AppStorage.getTokenData('accessToken');
  }

  get headerAuthorizationKey(): string {
    return 'Bearer ' + this.accessToken;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9',
      Authorization: this.headerAuthorizationKey,
    });
  }

  get httpOptions() {
    return { headers: this.headers };
  }

  constructor(private http: HttpClient) {}

  getAll<T>(url: string): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.APIUrl}/${url}`, this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  getById<T>(url: string, id: any): Observable<T> {
    return this.http
      .get<T>(`${this.APIUrl}/${url}/${id}`, this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.APIUrl}/${url}`, data, this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.APIUrl}/${url}`, data, this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${this.APIUrl}/${url}`, this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  refreshToken<T>(token: string): Observable<T> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get<T>(
      `${this.APIUrl}/accounts/refresh/${token}`,
      httpOptions
    );
  }

  login<T>(url: string, data: any): Observable<T> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<T>(`${this.APIUrl}/${url}`, data, httpOptions)
      .pipe(catchError((error) => this.handleError(error, url)));
  }

  private handleError(response: HttpErrorResponse, requestUrl?: string) {
    if (response.status === 403) {
      return throwError('Permission Denied');
    }
    //
    if (response.status === 500) {
      let error = response.error ? response.error.message : response.statusText;
      if (!error) {
        error = 'Internal Server Error';
      }
      //   AppNotify.error(error);
      return throwError(response);
    }
    //
    let messageError = '';
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
          `body was: ${response.error}`
      );
    }

    if (!!response.error && !!response.error.message) {
      messageError = response.error.message;
    } else {
      messageError = 'Something Bad Happened';
    }

    // AppNotify.error(messageError);

    // return an observable with a user-facing error message
    return throwError(messageError);
  }
}
