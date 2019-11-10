import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  CreateNewTodoComponent
} from './create-new-todo/create-new-todo.component';
import {
  GetTodoDataService
} from './services/get-todo-data.service';
import {
  Todo
} from './models/todo.model';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name = "Angular";


  toDoList: Array < Todo > ;

  constructor(public dialog: MatDialog, private toDoService: GetTodoDataService) {
    this.toDoList = []
  }

  ngOnInit(): void {

    this.toDoService.fetchAllTodos();
    this.toDoService.todoListObs.subscribe(data=>{
      if(data){
        this.toDoList = data
      }else{
        this.toDoList = [];
      }
    })

  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(CreateNewTodoComponent, {
      width: "800px",
      height: "600px",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.toDoService.fetchAllTodos();
      }
    });
  }

  sort(){

  }
}