import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../../shared/services/shared.services';
import { UserModel } from '../../shared/models/user.model';

@Pipe({
  name: 'userLookup',
})
export class UserLookupPipe implements PipeTransform {
  constructor(private service: SharedService) {}

  
  transform(userId: number) {
    // let user: UserModel;
    // this.service.getById<UserModel>(`users`, userId).subscribe((data) => {
    //   user = data;
    // });

    // return user.name;
  }

}
