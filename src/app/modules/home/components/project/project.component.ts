import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ProjectModel } from '../../models/project.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: ProjectModel

  constructor(private service : SharedService, private location: Location) { }

  ngOnInit(): void {
  }

  delete(event: Event, id: number){
    event.stopPropagation();
    console.log(id)
    this.service.delete<ProjectModel>('project', id).subscribe()
  }

}
