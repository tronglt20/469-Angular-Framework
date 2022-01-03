import { Component, Input, OnInit } from '@angular/core';
import { BusinessModel } from '../../../models/business.model';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  @Input() business: BusinessModel

  constructor() { }

  ngOnInit(): void {
  }

}
