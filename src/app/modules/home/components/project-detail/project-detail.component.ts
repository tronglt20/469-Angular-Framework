import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ProjectModel } from '../../models/project.model';
import { Location } from '@angular/common';
import { BusinessModel } from '../../models/business.model';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormCreateBusinessComponent } from '../../dialogs/form-create-business/form-create-business.component';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {
  project : ProjectModel
  projectId = Number(this.route.snapshot.paramMap.get('id'));

  businessList: BusinessModel [] 

  constructor(private route: ActivatedRoute,
              private service: SharedService,
              private location: Location,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProject()
    this.loadBusinessList()
  }

  // Open dialog
  openDialog() {
    const dialogRef = this.matDialog.open(FormCreateBusinessComponent, {
      width: '500px',
      data: {id: this.projectId}
    });
  }

  loadProject(){
    this.service.getById<ProjectModel>('project', this.projectId)
    .subscribe(data => this.project = data)
  }

  loadBusinessList(){
    this.service.getAll<BusinessModel>(`project/${this.projectId}/businesses`)
    .subscribe(data => this.businessList = data)
  }

  updateProjectName(newName){
    this.service.put<ProjectModel>(`project/${this.projectId}`, `"${newName}"`).subscribe();
  }

  goBack(){
    this.location.back()
  }

 
}
