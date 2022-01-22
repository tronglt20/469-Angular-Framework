import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ActivityModel } from '../../models/activity.model';
import { UserModel } from '../../../shared/models/user.model';
import { ActionEnum } from '../../models/enums/action.enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity : ActivityModel;

  ActionType = ActionEnum;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    if(this.activity){
      this.loadUserInfor();
    }
  }

  user : UserModel = new UserModel;

  loadUserInfor(){
    this.service
    .getById<UserModel>(`users`, this.activity.userId)
    .subscribe((data) => (this.user = data));
  }

}
