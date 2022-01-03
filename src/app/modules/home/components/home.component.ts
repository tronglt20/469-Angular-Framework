import { Component, DoCheck, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.services';
import { ProjectModel } from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.loadProjectList()
  }

  ProjectList: ProjectModel[] 

  loadProjectList(){
    this.service.getAll<ProjectModel>('project')
    .subscribe(data => this.ProjectList = data)
  }

  showProjects(){
    console.log(this.ProjectList)
  }

  addProject(name: string){
    name = name.trim()
    if(!name) return;
    this.service.post<ProjectModel>('project', `"${name}"`)
    .subscribe(project => {this.ProjectList.push(project); console.log(project)})
  }
}
