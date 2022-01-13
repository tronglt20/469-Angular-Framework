import {
  Component,
  ElementRef,
  HostListener,
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
    private location: Location,
    private matDialog: MatDialog,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadBusinessList();
  }

  project: ProjectModel;
  // Get project id from URL
  projectId = Number(this.route.snapshot.paramMap.get('id'));

  businessList: BusinessModel[];

  @ViewChild('projectNameInput') projectNameInput;

  loadProject() {
    this.service
      .getById<ProjectModel>('project', this.projectId)
      .subscribe((data) => (this.project = data));
  }

  loadBusinessList() {
    this.service
      .getAll<BusinessModel>(`project/${this.projectId}/businesses`)
      .subscribe((data) => (this.businessList = data));
  }


  goBack() {
    this.location.back();
  }

  // Open dialog
  addBusinessDialog() {
    const dialogRef = this.matDialog.open(BusinessDialog, {
      width: '500px',
      data: { id: this.projectId },
    });
    dialogRef.afterClosed().subscribe((result) => this.loadBusinessList());
  }

  addTagDialog() {
    const dialogRef = this.matDialog.open(TagDialog, {
      width: '50vh',
      height: '50vh',
      data: { id: this.projectId },
    });
  }

  // Update project name
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.project) {return};
    if (this.projectNameInput.nativeElement.contains(event.target)) {
      // Click inside
    } else {
      // Click outside
      this.service
        .put<ProjectModel>(
          `project/${this.projectId}`,
          `"${this.project.name}"`
        )
        .subscribe();
    }
  }
}
