import { SharedService } from 'src/app/modules/shared/services/shared.services';
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
    this.service.getAll<ProjectModel>('projects').subscribe((data) => {
      this.projectList = data;
    });
  }

  deleteProject(selected) {
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
    name = name.trim();
    if (!name) return;
    this.service
      .post<ProjectModel>('projects', `"${name}"`)
      .subscribe((project) => {
        this.loadProjectList();
      });
  }
}
