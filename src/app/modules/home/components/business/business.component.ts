import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { FormCreateCardComponent } from '../../dialogs/form-create-card/form-create-card.component';
import { BusinessModel } from '../../models/business.model';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  @Input() business: BusinessModel

  ngOnInit(): void {
    this.loadCardList();
  }

  cardList: CardModel[]

  constructor(private service: SharedService,
              private matDialog: MatDialog) { }

  loadCardList(){

    this.service.getAll<CardModel>(`business/${this.business.id}/cards`)
    .subscribe(data => this.cardList = data)
  }

   // Open dialog
   openDialog() {
    const dialogRef = this.matDialog.open(FormCreateCardComponent, {
      width: '900px',
      height: '700px',
      data: {id: this.business.id}
    });
  }


  

}
