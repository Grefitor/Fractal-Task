import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class GetTodoDataService {
  private restApiServer = "http://127.0.0.1:5000/";
  
  private todoList : Array<Todo>;
  private todoListBS: BehaviorSubject<Array<Todo>>;
  todoListObs: Observable<Array<Todo>>

  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {

      this.todoList = [];
      this.todoListBS = new BehaviorSubject(this.todoList)
      this.todoListObs = this.todoListBS.asObservable();

  }



  fetchAllTodos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.restApiServer + "fetchAllTodo")
        .toPromise()
        .then(res => {
          if (res["error"]) {
            this.snackBar.open(res["messageList"] + "", "", { duration: 2000 });
            resolve(false);
          } else {
            this.todoListBS.next(res["data"]);
            resolve(res["data"]);
          }
        });
    });
  }

  createTodo(todo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.restApiServer + "createTodo", todo)
        .toPromise()
        .then(res => {
          if (res["error"]) {
            this.snackBar.open(res["messageList"] + "", "", { duration: 2000 });
            resolve(false);
          } else {
            resolve(res["data"]);
          }
        });
    });
  }
  update(todo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.restApiServer + "createTodo", todo)
        .toPromise()
        .then(res => {
          if (res["error"]) {
            this.snackBar.open(res["messageList"] + "", "", { duration: 2000 });
            resolve(false);
          } else {
            resolve(res["data"]);
          }
        });
    });
  }

  deleteToDo(todoId: number): Promise<any> {
    let param = new HttpParams().set('id',todoId+'');
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.restApiServer + "deleteToDo",{params: param})
        .toPromise()
        .then(res => {
          if (res["error"]) {
            this.snackBar.open(res["messageList"] + "", "", { duration: 2000 });
            resolve(false);
          } else {
            resolve(res["data"]);
          }
        });
    });
  }

  fetchTodoBuckets(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.restApiServer + "fetchTodoBuckets")
        .toPromise()
        .then(res => {
          if (res["error"]) {
            this.snackBar.open(res["messageList"] + "", "", { duration: 2000 });
            resolve(false);
          } else {
            resolve(res["data"]);
          }
        });
    });
  }
}
