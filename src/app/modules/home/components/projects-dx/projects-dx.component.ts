import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from 'src/app/modules/shared/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects-dx',
  templateUrl: './projects-dx.component.html',
  styleUrls: ['./projects-dx.component.css'],
})
export class ProjectsDxComponent implements OnInit {
  currentUser: UserModel;
  store: CustomStore;
  dataSource: DataSource;

  constructor(
    private service: SharedService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: (params): Promise<ProjectModel[]> => {
        // console.log(params);
        return firstValueFrom(this.service.getAll<ProjectModel>('projects'));
      },
      insert: (values) => {
        if (!values.name) return;
        return firstValueFrom(
          this.service.post<ProjectModel>('projects', `"${values.name}"`)
        );
      },
      remove: (key) => {
        console.log(encodeURIComponent(key));
        return firstValueFrom(
          this.service.delete<void>(`projects/${encodeURIComponent(key)}`)
        );
      },
      update: (key, values) => {
        if (!values.name) return;
        return firstValueFrom(
          this.service.put<ProjectModel>(`projects/${key}`, `"${values.name}"`)
        );
      },
      // onLoaded: () => {
      //   console.log(this.store);
      // },
    });
  }

  ngOnInit(): void {
  }

 
}
