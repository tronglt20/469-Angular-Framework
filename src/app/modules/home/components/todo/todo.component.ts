import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    var self = this;
    self.todo.isCompleted = !this.todo.isCompleted;
    this.service
      .put<TodoModel>(`todos/${this.todo.id}/iscompleted`, `"${self.todo.isCompleted}"`)
      .subscribe();
    return self;
  }

}
