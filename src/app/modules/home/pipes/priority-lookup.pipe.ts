import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum } from '../../shared/models/priority.enum';

@Pipe({
  name: 'priorityLookup'
})
export class PriorityLookupPipe implements PipeTransform {

  transform(value: number): string {
    return PriorityEnum[value];
  }

}
