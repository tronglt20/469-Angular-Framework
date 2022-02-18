import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum } from '../models/enums/priority.enum';
import { Role } from '../models/role.model';

@Pipe({
  name: 'adminRoleValidate'  
})
export class AdminRoleValidate implements PipeTransform {

  transform(role: string): boolean {
    if(role == Role.SuperAdmin){
      return true;
    }
    return false;
  }
}
