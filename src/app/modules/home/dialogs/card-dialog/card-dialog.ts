import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PriorityEnum } from 'src/app/modules/shared/models/priority.enum';
import { UserModel } from 'src/app/modules/shared/models/user.model';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { ActivityModel } from '../../models/activity.model';
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
export class CardDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDialog>,
    private service: SharedService,
    private calender: NgbCalendar
  ) {}

  ngOnInit(): void {
    if (this.card) {
      this.loadTodoList();
      this.loadTagList();
      this.loadUserList();
      this.loadCardTag();
      this.loadCardAssign();
      this.loadActivities();
      this.isShow = false;
    }
  }

  @ViewChild('cardNameInput') cardNameInput;
  @ViewChild('todoNameInput') todoNameInput;
  isShow: boolean;

  model: NgbDateStruct;
  activities: ActivityModel[];

  businessId = this.data.businessId;
  projectId = this.data.projectId;
  card = this.data.card;
  todoList: TodoModel[];
  tagList: TagModel[];
  userList: UserModel[];
  cardTags: CardTag[];
  cardAssigns: CardAssign[];
  priorityList: { id: number; text: string }[] = [
    { id: PriorityEnum.Normal, text: 'Normal' },
    { id: PriorityEnum.Urgent, text: 'Urgent' },
  ];

  showActivity() {
    this.isShow = !this.isShow;
  }

  //  load-list
  loadActivities() {
    this.service
      .getAll<ActivityModel>(`activities/card/${this.card.id}`)
      .subscribe((data) => (this.activities = data));
  }
  loadTodoList() {
    this.service
      .getAll<TodoModel>(`card/${this.card.id}/todos`)
      .subscribe((data) => {
        this.todoList = data;
        this.loadActivities();
      });
  }
  loadTagList() {
    this.service
      .getAll<TagModel>(`project/${this.projectId}/tags`)
      .subscribe((data) => (this.tagList = data));
  }
  loadUserList() {
    this.service
      .getAll<UserModel>(`users`)
      .subscribe((data) => (this.userList = data));
  }
  // end-load-list

  loadCardTag() {
    this.service
      .getAll<CardTag>(`card/${this.card.id}/tags`)
      .subscribe((data) => (this.cardTags = data));
  }
  loadCardAssign() {
    this.service
      .getAll<CardAssign>(`card/${this.card.id}/user`)
      .subscribe((data) => (this.cardAssigns = data));
  }

  addCardTag(tagId: number) {
    this.service
      .post<CardTag>(`card/${this.card.id}/tags`, tagId)
      .subscribe((result) => this.loadCardTag());
  }
  addCardAssign(userId: number) {
    this.service
      .post<CardAssign>(`card/${this.card.id}/user`, userId)
      .subscribe((result) => this.loadCardAssign());
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

  updateDescription() {
    if (this.card.description == null) return;
    this.service
      .put<CardModel>(
        `cards/${this.card.id}/description`,
        `"${this.card.description}"`
      )
      .subscribe(result => {
        this.loadActivities()
      });
  }
  updateDuedate() {
    if (!this.model) return;
    const jsDate = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day
    );
    this.service
      .put<CardModel>(`cards/${this.card.id}/duedate`, `"${jsDate.toJSON()}"`)
      .subscribe((result) => {
        this.card.duedate = jsDate.toJSON();
        this.loadActivities();
      });
  }

  updatePriority(priorityId: number) {
    // console.log(priorityName)
    // if (priorityName == this.cardPriorityValue) return;
    // var priorityId = PriorityEnum[priorityName];
    this.service
      .put<CardModel>(`cards/${this.card.id}/priority`, priorityId)
      .subscribe((id) => {
        this.card.priority = priorityId;
        this.loadActivities();
        //Create angular lookup pipe, TO show priority name by id
      });
    // this.cardPriorityValue = priorityName;
  }

  removeCardAssign(e: Event, userId: number) {
    e.stopPropagation();
    // Remove CardAssign
    this.service
      .delete<CardAssign>(`card/${this.card.id}/user/${userId}`)
      .subscribe((id) => {
        this.loadCardAssign();
      });
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
        .subscribe(result => {
          // this.loadActivities();
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  auto_grow(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }
}
