import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ProjectModel } from '../../models/project.model';
import { Location } from '@angular/common';
import { BusinessModel } from '../../models/business.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TagDialog } from '../../dialogs/tag-dialog/tag-dialog.component';
import { BusinessDialog } from '../../dialogs/business-dialog/business-dialog';
import { UserModel } from 'src/app/modules/shared/models/user.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: SharedService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProjectDetail();
    this.loadBusinessList();
    this.getAllUsers();
  }
  users: UserModel[];
  project: ProjectModel;
  // Get project id from URL
  projectRouteId = Number(this.route.snapshot.paramMap.get('id'));

  businessList: BusinessModel[];

  @ViewChild('projectNameInput') projectNameInput;

  loadProjectDetail() {
    this.service
      .getById<ProjectModel>('projects', this.projectRouteId)
      .subscribe((data) => (this.project = data));
  }

  loadBusinessList() {
    this.service
      .getAll<BusinessModel>(`project/${this.projectRouteId}/businesses`)
      .subscribe((data) => (this.businessList = data));
  }


  // Open dialog
  addBusinessDialog() {
    const dialogRef = this.matDialog.open(BusinessDialog, {
      width: '500px',
      data: { id: this.project.id },
    });
    dialogRef.afterClosed().subscribe((result) => this.loadBusinessList());
  }

  addTagDialog() {
    const dialogRef = this.matDialog.open(TagDialog, {
      width: '50vh',
      height: '50vh',
      data: { id: this.project.id },
    });
  }

  getAllUsers() {
    this.service.getAll<UserModel>('users').subscribe((data) => {
      this.users = data;
    });
  }

  // Update project name
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (!this.project) {
  //     return;
  //   }
  //   if (this.projectNameInput.nativeElement.contains(event.target)) {
  //     // Click inside
  //   } else {
  //     // Click outside
  //     this.service
  //       .put<ProjectModel>(
  //         `projects/${this.project.id}`,
  //         `"${this.project.name}"`
  //       )
  //       .subscribe();
  //   }
  // }
}
