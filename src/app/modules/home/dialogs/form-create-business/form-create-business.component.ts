import { Component, OnInit, Inject, Input  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { BusinessModel } from '../../models/business.model';

@Component({
  selector: 'app-form-create-business',
  templateUrl: './form-create-business.component.html',
  styleUrls: ['./form-create-business.component.css']
})
export class FormCreateBusinessComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              public dialogRef: MatDialogRef<FormCreateBusinessComponent>,
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

