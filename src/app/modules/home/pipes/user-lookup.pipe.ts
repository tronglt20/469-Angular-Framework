import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../../shared/services/shared.services';
import { UserModel } from '../../shared/models/user.model';

@Pipe({
  name: 'userLookup',
})
export class UserLookupPipe implements PipeTransform {

  transform(userId: string, users: UserModel[]): string {
    var user = users?.find(user => user.id == userId)

    return user ? user.userName : null;
  }
}
