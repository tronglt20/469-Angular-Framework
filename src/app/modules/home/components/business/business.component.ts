import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
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
    console.log(event)
    // var, let, const
    let card = event.item.data;
    let index = event.currentIndex;

    // Move on it own business
    if (event.previousContainer === event.container) {
      // Stay
      if (event.currentIndex == event.previousIndex) return;

      // Down
      if (event.currentIndex > event.previousIndex) {
        var previousCard = event.container.data[index];
        var nextCard = event.container.data[index + 1];
      } else {
        // Up
        var nextCard = event.container.data[index];
        var previousCard = event.container.data[index - 1];
      }

      if (!previousCard) {
        card.index = nextCard.index / 2;
      } else if (!nextCard) {
        card.index = previousCard.index + 1;
      } else {
        card.index = (previousCard?.index + nextCard?.index) / 2;
      }

      var body :{busId: number, index: number} = {
        busId: this.business.id,
        index: card.index,
      };

      this.service
        .put<CardModel>(`cards/${card.id}/movement`, body)
        .subscribe((result) => this.loadCardList());

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move on other business
      var previousCard = event.container.data[index - 1];
      var nextCard = event.container.data[index];

      if (!previousCard && !nextCard) {
        card.index = 1;
      } else if (!previousCard) {
        card.index = nextCard.index / 2;
      } else if (!nextCard) {
        card.index = previousCard.index + 1;
      } else {
        card.index = (previousCard?.index + nextCard?.index) / 2;
      }

      var body :{busId: number, index: number} = {
        busId: this.business.id,
        index: card.index,
      };

      this.service
        .put<CardModel>(`cards/${card.id}/movement`, body)
        .subscribe((result) => this.loadCardList());

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
