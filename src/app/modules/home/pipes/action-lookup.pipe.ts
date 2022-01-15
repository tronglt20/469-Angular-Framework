import { Pipe, PipeTransform } from '@angular/core';
import { ActionEnum } from '../../shared/models/action.enum';

@Pipe({
  name: 'actionLookup',
})
export class ActionLookupPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'created this card';
      case 2:
        return 'updated card name';
      case 3:
        return 'updated card business';
      case 4:
        return 'reorder card';
      case 5:
        return 'updated card priority';
      case 6:
        return 'updated card description';
      case 7:
        return 'updated duedate';
      case 8:
        return 'deleted this card';
      default:
        console.log('No such value exists!');
        break;
    }
  }
}
