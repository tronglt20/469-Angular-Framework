import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  userName = ""
  password = ""

  constructor() { }
  ngOnInit(): void {
  }
  
  onLoginClick(args){

  }
}
