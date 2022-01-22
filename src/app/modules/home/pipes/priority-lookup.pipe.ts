import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum } from '../models/enums/priority.enum';

@Pipe({
  name: 'priorityLookup'  
})
export class PriorityLookupPipe implements PipeTransform {

  transform(value: number): string {
    return PriorityEnum[value];
  }

}
