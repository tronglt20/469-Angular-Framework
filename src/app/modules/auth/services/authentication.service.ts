import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { LoginModel } from '../../shared/models/login.model';
import {
  AuthenticatedRespone,
  UserModel,
} from '../../shared/models/user.model';
import { SharedService } from '../../shared/services/shared.services';
import { AppStorage } from '../../shared/utilities/app-storage';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private service: SharedService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      AppStorage.getCurrentUser('currentUser')
      // JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(loginModel: LoginModel) {
    return this.service
      .post<AuthenticatedRespone>(`accounts/login`, loginModel)
      .pipe(
        map((response) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          AppStorage.storeTokenData('accessToken', response.accessToken);
          AppStorage.storeTokenData('refreshToken', response.refreshToken);

          this.service
            .post<UserModel>(`users/current`, {})
            .subscribe((user) => {
              AppStorage.storeCurrentUser('currentUser', user);
              this.currentUserSubject.next(user);
              return user;
            });
        })
      );
  }
  refresh(refreshToken: string) {
    return this.service.refreshToken<AuthenticatedRespone>(refreshToken).subscribe((response) => {
      AppStorage.removeItem('accessToken');
      AppStorage.removeItem('accessToken');

      AppStorage.storeTokenData('accessToken', response.accessToken);
      AppStorage.storeTokenData('refreshToken', response.refreshToken);
    });

  }

  logout() {
    // remove user from local storage to log user out
    AppStorage.removeItem('accessToken');
    AppStorage.removeItem('refreshToken');
    AppStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);
  }
}
