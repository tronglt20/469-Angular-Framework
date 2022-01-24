import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ActivityModel } from '../../models/activity.model';
import { UserModel } from '../../../shared/models/user.model';
import { ActionEnum } from '../../models/enums/action.enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ActivityComponent implements OnInit {
  @Input() activity: ActivityModel;

  @Input() user: UserModel;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
  }

}
