import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { CardDialog } from '../../dialogs/card-dialog/card-dialog';
import { BusinessModel } from '../../models/business.model';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-business-dx',
  templateUrl: './business-dx.component.html',
  styleUrls: ['./business-dx.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessDxComponent implements OnInit {
  @Input() business: BusinessModel;

  ngOnInit(): void {
    this.loadCardList();
  }

  cardList: CardModel[] = [];
  popupVisible = false;

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

  showAddCardDialog() {
    this.popupVisible = true;
  }

  addCardOption(name: string) {
    name = name.trim();
    if (!name) return;
    this.service
      .post<CardModel>(`business/${this.business.id}/cards`, `"${name}"`)
      .subscribe((result) => {
        this.popupVisible = false;
        this.loadCardList();
      });
  }

  onTaskDragStart(e) {
    // console.log('Drag');
    // console.log(e);
    e.itemData = e.fromData[e.fromIndex];
  }

  onTaskDrop(e) {
    let card = e.itemData;
    // console.log('Drop');
    console.log(e);

    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);

    let previousCard;
    let nextCard;

    previousCard = e.toData[e.toIndex - 1];
    nextCard = e.toData[e.toIndex + 1];

    // console.log(previousCard);
    // console.log(nextCard);

    
    if (!previousCard) {
      card.index = 1;
      if (nextCard) {
        card.index = nextCard.index / 2;
      }
    } else if (!nextCard) {
      card.index = previousCard.index + 1;
    } else {
      card.index = (previousCard?.index + nextCard?.index) / 2;
    }

    var body: { busId: number; index: number } = {
      busId: this.business.id,
      index: card.index,
    };

    this.service
      .put<CardModel>(`cards/${card.id}/movement`, body)
      .subscribe((result) => this.loadCardList());
  }
}
