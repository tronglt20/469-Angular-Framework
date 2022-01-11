import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ProjectModel } from '../../models/project.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: ProjectModel
  @Output() projectSelected = new EventEmitter<ProjectModel>()

  constructor(private service : SharedService, private location: Location) { }

  ngOnInit(): void {
  }

  selectProject(e: Event){
    e.stopPropagation();
    this.projectSelected.emit(this.project);
  }

}
