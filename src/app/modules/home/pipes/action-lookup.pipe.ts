import { Pipe, PipeTransform } from '@angular/core';
import { ActionEnum } from '../models/enums/action.enum';

@Pipe({
  name: 'actionLookup',
})
export class ActionLookupPipe implements PipeTransform {
  transform(
    value: ActionEnum,
    previousValue: string,
    currentValue: string
  ): string {
    switch (value) {
      case ActionEnum.Create:
        // return `created this task`;
        return `<div> created this task</div>`;
      case ActionEnum.UpdateName:
        return `<div>renamed this task to ${currentValue}</div>`;
      case ActionEnum.UpdateBusiness:
        return `<div>moved this task from <p>${previousValue}</p> to <p>${currentValue}</p></div>`;
      case ActionEnum.ReOrder:
        return `<div>reorder this task on <p>${currentValue}</p></div>`;
      case ActionEnum.UpdatePriority:
        return `set ${currentValue} for this task`;
      case ActionEnum.UpdateDescription:
        return `updated the description`;
      case ActionEnum.UpdateDuedate:
        return `Set due date on ${currentValue}`;
      case ActionEnum.Delete:
        return 'deleted this card';
      case ActionEnum.AssignUser:
        return `<div>assigned ${currentValue} to this task </div>`;
      case ActionEnum.RemoveAssignUser:
        return `removed ${currentValue} from this task`;
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
