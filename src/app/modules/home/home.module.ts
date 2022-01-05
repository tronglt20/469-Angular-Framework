import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { FormsModule } from '@angular/forms';
import { BusinessComponent } from './components/business/business.component';
import { CardComponent } from './components/card/card.component';
import { FormCreateBusinessComponent } from './dialogs/form-create-business/form-create-business.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormCreateCardComponent } from './dialogs/form-create-card/form-create-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    ProjectDetailComponent,
    BusinessComponent,
    CardComponent,
    FormCreateCardComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'project/:id', component: ProjectDetailComponent}
    ]),
    MatDialogModule,
  ],
  entryComponents:[
    FormCreateBusinessComponent, 
    FormCreateCardComponent
  ]
})
export class HomeModule { }
