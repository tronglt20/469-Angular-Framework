import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userLookup'
})
export class UserLookupPipe implements PipeTransform {

 
  transform(userId: number): string {
    return null;
  }

}
