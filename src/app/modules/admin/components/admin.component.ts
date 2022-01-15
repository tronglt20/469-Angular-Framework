import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshUserList()
  }

  UserList: any=[];

  refreshUserList(){
    // this.service.get<UserModel>('user').subscribe(data =>{
    //   this.UserList = data
    // })
    
  }
}
