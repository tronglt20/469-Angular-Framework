import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/modules/shared/models/user.model';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { CardModel } from '../../models/card.model';
import { CardAssign } from '../../models/cardAssign.model';
import { CardTag } from '../../models/cardTag.model';
import { TagModel } from '../../models/tag.model';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'card-dialog',
  templateUrl: './card-dialog.html',
  styleUrls: ['./card-dialog.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDialog implements OnInit  {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDialog>,
    private service: SharedService,
    private eRef: ElementRef
  ) {}


  ngOnInit(): void {
    if (this.card) {
      this.loadTodoList();
      this.loadTagList();
      this.loadUserList();
      this.loadCardTag();
      this.loadCardAssign();
    }
  }

  @ViewChild('cardNameInput') cardNameInput;
  @ViewChild('todoNameInput') todoNameInput;

  businessId = this.data.businessId;
  projectId = this.data.projectId;
  card = this.data.card;
  todoList: TodoModel[];
  tagList: TagModel[];
  userList: UserModel[];
  cardTags: CardTag[];
  cardAssigns: CardAssign[];

  //  load-list 
  loadTodoList() {
    this.service
      .getAll<TodoModel>(`card/${this.card.id}/todos`)
      .subscribe((data) => (this.todoList = data));
  }
  loadTagList() {
    this.service
      .getAll<TagModel>(`project/${this.projectId}/tags`)
      .subscribe((data) => (this.tagList = data));
  }
  loadUserList(){
    this.service
    .getAll<UserModel>(`users`)
    .subscribe((data) => (this.userList = data));
  }
  // end-load-list 


  loadCardTag(){
    this.service
      .getAll<CardTag>(`card/${this.card.id}/tags`)
      .subscribe((data) => (this.cardTags = data));
  }
  loadCardAssign(){
    this.service
      .getAll<CardAssign>(`card/${this.card.id}/user`)
      .subscribe((data) => (this.cardAssigns = data));
  }

  addCardTag(tagId: number){
    this.service
      .post<CardTag>(`card/${this.card.id}/tags`, tagId)
      .subscribe(result => this.loadCardTag());
  }
  addCardAssign(userId: number){
    this.service
    .post<CardAssign>(`card/${this.card.id}/user`, userId)
    .subscribe(result => this.loadCardAssign());
  }

  addCard(name: string) {
    name = name.trim();
    if (!name) return;
    this.service
      .post<CardModel>(`business/${this.businessId}/cards`, `"${name}"`)
      .subscribe();
    this.dialogRef.close();
  }

  addTodo(name: string) {
    name = name.trim();
    if (!name) return;
    this.service
      .post<TodoModel>(`card/${this.card.id}/todos`, `"${name}"`)
      .subscribe((result) => this.loadTodoList());
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.card) return;
    // Update card name
    if (this.cardNameInput.nativeElement.contains(event.target)) {
      // Click inside
    } else {
      this.service // Click outside
        .put<CardModel>(`cards/${this.card.id}/name`, `"${this.card.name}"`)
        .subscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
