import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { FormsModule } from '@angular/forms';
import { BusinessComponent } from './components/project-detail/business/business.component';
import { CardComponent } from './components/project-detail/card/card.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    ProjectDetailComponent,
    BusinessComponent,
    CardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'project/:id', component: ProjectDetailComponent}
    ])
  ]
})
export class HomeModule { }
