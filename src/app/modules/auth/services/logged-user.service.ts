import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class LoggedUserService {
  private _currentUser: UserModel;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this._currentUser = x)
    );
  }

  get loggedUser(): UserModel {
    return this._currentUser;
  }

  
}
