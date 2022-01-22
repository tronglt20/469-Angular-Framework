import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from 'src/app/modules/shared/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  currentUser: UserModel;
  constructor(
    private service: SharedService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.loadProjectList();
  }

  projectList: ProjectModel[];

  loadProjectList() {
    if (!this.currentUser) {
      this.projectList = [];
      return;
    }

    this.service
      .getAll<ProjectModel>('projects')
      .subscribe((data) => (this.projectList = data));

  }
  funct: Function;

  deleteProject(selected) {
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.service.delete<ProjectModel>(`projects/${selected.id}`).subscribe({
      next: (result) => {
        this.loadProjectList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProject(name: string) {
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    name = name.trim();
    if (!name) return;
    this.service
      .post<ProjectModel>('projects', `"${name}"`)
      .subscribe((project) => {
        this.loadProjectList();
      });
  }
}
