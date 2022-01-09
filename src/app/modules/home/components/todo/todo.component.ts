import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  updateTodoStatus(){
    let isCompleted = !this.todo.isCompleted;
    this.service
      .put<TodoModel>(`todos/${this.todo.id}/iscompleted`, `"${isCompleted}"`)
      .subscribe();
  }

}
