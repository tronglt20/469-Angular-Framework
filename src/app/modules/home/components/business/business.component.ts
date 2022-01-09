import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { BusinessDialog } from '../../dialogs/business-dialog/business-dialog';
import { CardDialog } from '../../dialogs/card-dialog/card-dialog';
import { BusinessModel } from '../../models/business.model';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessComponent implements OnInit {
  @Input() business: BusinessModel;

  ngOnInit(): void {
    this.loadCardList();
  }

  cardList: CardModel[] = [];

  constructor(private service: SharedService, private matDialog: MatDialog) {}

  loadCardList() {
    this.service
      .getAll<CardModel>(`business/${this.business.id}/cards`)
      .subscribe((data) => (this.cardList = data));
    return this.cardList;
  }

  // Open dialog
  addCardDialog() {
    const dialogRef = this.matDialog.open(CardDialog, {
      width: '500px',
      data: { businessId: this.business.id },
    });
    dialogRef.afterClosed().subscribe((result) => this.loadCardList());
  }

  drop(event: CdkDragDrop<CardModel[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // this.service
      // .put<CardModel>(`cards/${event.item.data.id}/movement`, `"${newName}"`).subscribe();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
