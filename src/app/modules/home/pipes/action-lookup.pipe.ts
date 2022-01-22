import { Pipe, PipeTransform } from '@angular/core';
import { ActionEnum } from '../models/enums/action.enum';

@Pipe({
  name: 'actionLookup',
})
export class ActionLookupPipe implements PipeTransform {
  transform(value: ActionEnum, previousValue: string, currentValue: string): string {
    switch (value) {
      case ActionEnum.Create:
        return `created this task`;
      case ActionEnum.UpdateName:
        return `renamed this task to ${currentValue}`;
      case 3:
        return `moved this task from ${previousValue} to ${currentValue}`;
      case 4:
        return `reorder this task on ${currentValue}`;
      case 5:
        return `set ${currentValue} for this task`;
      case 6:
        return `updated the description`;
      case 7:
        return `Set due date on ${currentValue}`;
      case 8:
        return 'deleted this card';
      case 9:
        return `assigned ${currentValue} to this task`;
      case 10:
        return `removed ${currentValue} from this task`;
      case 11:
        return `set label ${currentValue} for this task`;
      case 12:
        return `removed label ${currentValue} from this task`;
      default:
        console.log('No such value exists!');
        break;
    }
  }
}
