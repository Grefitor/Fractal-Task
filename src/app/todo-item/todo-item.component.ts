import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { GetTodoDataService } from '../services/get-todo-data.service';
import { MatDialog } from '@angular/material';
import { CreateNewTodoComponent } from '../create-new-todo/create-new-todo.component';

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"]
})
export class TodoItemComponent implements OnInit {
  @Input() toDoItem: Todo;
  constructor(private getData: GetTodoDataService, public dialog: MatDialog) {}

  ngOnInit() {}
  delete() {
    this.getData.deleteToDo(this.toDoItem.todoId).then(data => {
      if (data) {
        this.getData.fetchAllTodos();
      }
    });
  }
  updateStatus(checked) {
    if (checked) {
      this.toDoItem.todo_status = 2;
      this.getData.update(this.toDoItem).then(data => {
        if (data) {
          this.getData.fetchAllTodos();
        }
      });
    } else {
      this.toDoItem.todo_status = 1;
      this.getData.update(this.toDoItem).then(data => {
        if (data) {
          this.getData.fetchAllTodos();
        }
      });
    }
  }

  editTask(){
    this.dialog.open(CreateNewTodoComponent, {
      width: "800px",
      height: "600px",
      data: this.toDoItem
    });
  }
}
