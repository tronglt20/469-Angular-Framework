import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { CardModel } from '../../../models/card.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PriorityEnum } from '../../../models/enums/priority.enum';
import { CardAssign } from '../../../models/cardAssign.model';
import { UserModel } from 'src/app/modules/shared/models/user.model';
import { CardTag } from '../../../models/cardTag.model';
import { TagModel } from '../../../models/tag.model';
import { TodoModel } from '../../../models/todo.model';

@Component({
  selector: 'card-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  @Input() card: CardModel;
  @Input() projectId: string;

  model: NgbDateStruct;
  userList: UserModel[];
  cardAssigns: CardAssign[];
  cardTags: CardTag[];
  todoList: TodoModel[];
  tagList: TagModel[];
  priorityList: { id: number; text: string }[] = [
    { id: PriorityEnum.Normal, text: 'Normal' },
    { id: PriorityEnum.Urgent, text: 'Urgent' },
  ];

  isReadOnly: boolean;
  isShowActivity: boolean = false;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    if (this.card) {
      this.loadTodoList();
      this.loadTagList();
      this.loadUserList();
      this.loadCardTag();
      this.loadCardAssign();
      this.isShowActivity = false;
      this.isReadOnly = true;
    }
  }

  addTodo(name: string) {
    name = name.trim();
    if (!name) return;
    this.service
      .post<TodoModel>(`card/${this.card.id}/todos`, `"${name}"`)
      .subscribe((result) => {
        this.loadTodoList();
        // this.loadActivities();
      });
  }

  loadTodoList() {
    this.service
      .getAll<TodoModel>(`card/${this.card.id}/todos`)
      .subscribe((data) => {
        this.todoList = data;
        // this.loadActivities();
      });
  }
  loadTagList() {
    this.service
      .getAll<TagModel>(`project/${this.projectId}/tags`)
      .subscribe((data) => (this.tagList = data));
  }
  loadCardTag() {
    this.service
      .getAll<CardTag>(`card/${this.card.id}/tags`)
      .subscribe((data) => {
        this.cardTags = data;
      });
  }
  loadUserList() {
    this.service.getAll<UserModel>(`users`).subscribe((data) => {
      this.userList = data;
    });
  }
  loadCardAssign() {
    this.service
      .getAll<CardAssign>(`card/${this.card.id}/user`)
      .subscribe((data) => (this.cardAssigns = data));
  }

  updateDuedate() {
    // console.log(this.model)
    // console.log(this.card.duedate)
    if (!this.model) return;
    const jsDate = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day
    );
    this.service
      .put<CardModel>(`cards/${this.card.id}/duedate`, `"${jsDate.toJSON()}"`)
      .subscribe({
        next: (result) => {
          this.card.duedate = jsDate;
          // this.loadActivities();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  updatePriority(priorityId: number) {
    if (priorityId == this.card.priority) return;
    // console.log(priorityName)
    // if (priorityName == this.cardPriorityValue) return;
    // var priorityId = PriorityEnum[priorityName];
    this.service
      .put<CardModel>(`cards/${this.card.id}/priority`, priorityId)
      .subscribe((id) => {
        this.card.priority = priorityId;
        // this.loadActivities();
        //Create angular lookup pipe, TO show priority name by id
      });
    // this.cardPriorityValue = priorityName;
  }

  updateDescription(input: string) {
    if (input == null || input == this.card.description) return;
    this.service
      .put<CardModel>(`cards/${this.card.id}/description`, `"${input}"`)
      .subscribe((result) => {
        this.isReadOnly = !this.isReadOnly;
        // this.loadActivities();
      });
  }
  getActivityUser(userId: string): UserModel {
    var user = this.userList?.find((user) => user.id == userId);
    return user;
  }

  auto_grow(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }

  editDescription() {
    this.isReadOnly = !this.isReadOnly;
  }
}
