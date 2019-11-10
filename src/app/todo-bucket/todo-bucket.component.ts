import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { GetTodoDataService } from '../services/get-todo-data.service';
import { MatDialog, MatCheckboxChange } from '@angular/material';
import { CreateNewTodoComponent } from '../create-new-todo/create-new-todo.component';

@Component({
  selector: "app-todo-bucket",
  templateUrl: "./todo-bucket.component.html",
  styleUrls: ["./todo-bucket.component.scss"]
})
export class TodoBucketComponent implements OnInit {
  @Input() bucketItem: Todo;
  constructor(private getData: GetTodoDataService, public dialog: MatDialog) {}

  ngOnInit() {}
  delete() {
    this.getData.deleteToDo(this.bucketItem.todoId).then(data => {
      if (data) {
        this.getData.fetchAllTodos();
      }
    });
  }
  updateStatus(checked) {
    if (checked) {
      this.bucketItem.todo_status = 2;
      this.getData.update(this.bucketItem).then(data => {
        if (data) {
          this.getData.fetchAllTodos();
        }
      });
    } else {
      this.bucketItem.todo_status = 1;
      this.getData.update(this.bucketItem).then(data => {
        if (data) {
          this.getData.fetchAllTodos();
        }
      });
    }
  }

  editTask() {
    this.dialog.open(CreateNewTodoComponent, {
      width: "800px",
      height: "600px",
      data: this.bucketItem
    });
  }
  updateChild(task) {
    this.dialog.open(CreateNewTodoComponent, {
      width: "800px",
      height: "600px",
      data: task
    });
  }

  updateStatusChild(event: MatCheckboxChange, task){
     if (event.checked) {
       task.todo_status = 2;
       this.getData.update(task).then(data => {
         if (data) {
           this.getData.fetchAllTodos();
         }
       });
     } else {
       task.todo_status = 1;
       this.getData.update(task).then(data => {
         if (data) {
           this.getData.fetchAllTodos();
         }
       });
     }
  }
}
