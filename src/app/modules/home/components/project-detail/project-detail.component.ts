import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ProjectModel } from '../../models/project.model';
import { Location } from '@angular/common';
import { BusinessModel } from '../../models/business.model';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {
  project : ProjectModel
  projectId = Number(this.route.snapshot.paramMap.get('id'));
  businessList: BusinessModel [] 

  constructor(private route: ActivatedRoute,
              private service: SharedService,
              private location: Location) { }

  ngOnInit(): void {
    this.loadProject()
    this.loadBusinessList()
  }

  loadProject(){
    this.service.getById<ProjectModel>('project', this.projectId)
    .subscribe(data => this.project = data)
  }

  loadBusinessList(){
    this.service.getAll<BusinessModel>(`project/${this.projectId}/businessse`)
    .subscribe(data => this.businessList = data)
  }

  addBusiness(){
    
  }

  updateProjectName(){
    var id = this.project.id
    var name = this.project.name;
    this.service.put<ProjectModel>(`project/${id}`, `"${name}"`).subscribe();
  }

  goBack(){
    this.location.back()
  }
}
