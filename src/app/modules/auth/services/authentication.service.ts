import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { LoginModel } from '../../shared/models/login.model';
import { UserModel } from '../../shared/models/user.model';
import { SharedService } from '../../shared/services/shared.services';
import { AppStorage } from '../../shared/utilities/app-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private service: SharedService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(loginModel: LoginModel) {
    return this.service.post<UserModel>(`accounts/login`, loginModel).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // this.storage.storeCurrentUser('currentUser', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
