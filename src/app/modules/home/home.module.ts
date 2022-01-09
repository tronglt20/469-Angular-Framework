import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { FormsModule } from '@angular/forms';
import { BusinessComponent } from './components/business/business.component';
import { CardComponent } from './components/card/card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CardDialog } from './dialogs/card-dialog/card-dialog';

import { DragDropModule} from '@angular/cdk/drag-drop';
import { BusinessDialog } from './dialogs/business-dialog/business-dialog';
import { TagDialog } from './dialogs/tag-dialog/tag-dialog.component';
import { TodoComponent } from './components/todo/todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    ProjectDetailComponent,
    BusinessComponent,
    CardComponent,
    TagDialog,
    CardDialog,
    TodoComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'project/:id', component: ProjectDetailComponent}
    ]),
    MatDialogModule,
    DragDropModule,
    NgbModule
  ],
  entryComponents:[
    BusinessDialog,
  ]
})
export class HomeModule { }
