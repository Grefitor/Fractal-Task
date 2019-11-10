import { Component, OnInit } from '@angular/core';
import { ITodo, Status } from './todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  item: string = '';
  todos: ITodo[] = [];
  status: Status = 'doing';

  constructor() { }

  onAdd(e) {
    const item = e.target.value;
    if (!item) {
      return;
    }

    const newTodo: ITodo = {
      id: Date.now(),
      item,
      done: false,
    };
    this.todos.push(newTodo);
    this.item = '';
  }

  ngOnInit() {
  }

}