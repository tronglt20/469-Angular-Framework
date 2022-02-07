import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../shared/models/user.model';
import { ActionEnum } from '../models/enums/action.enum';
import { UserLookupPipe } from './user-lookup.pipe';

@Pipe({
  name: 'actionLookup',
})
export class ActionLookupPipe implements PipeTransform {
  userLookupPipe = new UserLookupPipe();
  transform(
    value: ActionEnum,
    previousValue: string,
    currentValue: string,
    users: UserModel[]
  ): string {
    switch (value) {
      case ActionEnum.Create:
        // return `created this task`;
        return `created this task`;
      case ActionEnum.UpdateName:
        return `renamed this task to ${currentValue}`;
      case ActionEnum.UpdateBusiness:
        return `moved this task from <p>${previousValue}</p> to <p>${currentValue}</p>`;
      case ActionEnum.ReOrder:
        return `reorder this task on <p>${currentValue}</p>`;
      case ActionEnum.UpdatePriority:
        return `set ${currentValue} for this task`;
      case ActionEnum.UpdateDescription:
        return `updated the description`;
      case ActionEnum.UpdateDuedate:
        return `Set due date on ${currentValue}`;
      case ActionEnum.Delete:
        return 'deleted this card';
      case ActionEnum.AssignUser:
        return `assigned ${this.userLookupPipe.transform(currentValue, users)} to this task `;
      case ActionEnum.RemoveAssignUser:
        return `removed ${this.userLookupPipe.transform(currentValue, users)} from this task`;
      case ActionEnum.AddLabel:
        return `set label ${currentValue} for this task`;
      case ActionEnum.RemoveLabel:
        return `removed label ${currentValue} from this task`;
      default:
        console.log('No such value exists!');
        break;
    }
  }
}
