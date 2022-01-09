import { Component, DoCheck, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/services/shared.services';
import { ProjectModel } from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.loadProjectList();
  }

  projectList: ProjectModel[] = [];

  loadProjectList() {
    this.service
      .getAll<ProjectModel>('project')
      .subscribe((data) => (this.projectList = data));
  }

  addProject(name: string) {
    name = name.trim();
    if (!name) return;
    this.service
      .post<ProjectModel>('project', `"${name}"`)
      .subscribe((project) => {
          this.loadProjectList();
      });
  }

}
