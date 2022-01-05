import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-form-create-card',
  templateUrl: './form-create-card.component.html',
  styleUrls: ['./form-create-card.component.css']
})
export class FormCreateCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              public dialogRef: MatDialogRef<FormCreateCardComponent>,
              private service: SharedService) { }

  ngOnInit(): void {
  }

  busId = this.data.id;
  
  onNoClick() {
    this.dialogRef.close();
  }

  addBusiness(name: string){
    name = name.trim()
    if(!name) return;
    this.service.post<CardModel>(`business/${this.busId}/cards`, `"${name}"`).subscribe()
    this.dialogRef.close();
  }
}
