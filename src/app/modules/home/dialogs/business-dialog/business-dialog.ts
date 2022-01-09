import { Component, OnInit, Inject, Input  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { BusinessModel } from '../../models/business.model';

@Component({
  selector: 'business-dialog',
  templateUrl: './business-dialog.html',
  styleUrls: ['./business-dialog.css']
})
export class BusinessDialog implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              public dialogRef: MatDialogRef<BusinessDialog>,
              private service: SharedService ) { }

  ngOnInit(): void {
  }

  projectId = this.data.id;
  
  onNoClick() {
    this.dialogRef.close();
  }

  addBusiness(name: string){
    name = name.trim()
    if(!name) return;
    this.service.post<BusinessModel>(`project/${this.projectId}/businesses`, `"${name}"`).subscribe()
    this.dialogRef.close();
  }

  
}

