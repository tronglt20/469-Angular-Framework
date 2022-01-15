import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDialog } from '../../dialogs/card-dialog/card-dialog';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}
  @Input() projectId: number;
  @Input() card: CardModel;

  openCardDialog() {
    const dialogRef = this.matDialog.open(CardDialog, {
      width: '100vh',
      height: '90vh',
      data: { card: this.card, projectId: this.projectId },
      panelClass: 'cardDialog'
    });
    dialogRef.afterClosed().subscribe();
  }
}
