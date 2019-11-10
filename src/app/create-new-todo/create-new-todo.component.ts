import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Todo
} from '../models/todo.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  GetTodoDataService
} from '../services/get-todo-data.service';
import {
  Observable
} from "rxjs";
import {
  map,
  startWith
} from "rxjs/operators";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
@Component({
  selector: "app-create-new-todo",
  templateUrl: "./create-new-todo.component.html",
  styleUrls: ["./create-new-todo.component.scss"]
})
export class CreateNewTodoComponent implements OnInit {
  todoItem: Todo;
  todoBucketOptions: Array < Todo > ;
  filteredOptions: Observable < Todo[] > ;
  todoForm: FormGroup;
  showParentFlag: boolean = false;
  editFlag: boolean = false;
  constructor(
    private form: FormBuilder,
    private getData: GetTodoDataService,
    public dialogRef: MatDialogRef < CreateNewTodoComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.todoItem = new Todo();
    this.todoItem.content_type = 0;
    this.todoBucketOptions = [];


  }

  ngOnInit() {
    this.todoForm = this.form.group({
      title: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      content: new FormControl("", [Validators.maxLength(200)]),
      parentId: new FormControl("0")
    });

    if (this.data) {
      this.editFlag = true;
      this.todoItem = this.data;
      if(this.todoItem.parentId){
        this.showParent(true)
      }
      this.todoForm.patchValue({
        parentId: this.todoItem.parentId,
        title: this.todoItem.title
      });


    }

    this.getData.fetchTodoBuckets().then(data => {
      if (data) {
        this.todoBucketOptions = data;
        console.log(this.todoBucketOptions);
      } else {
        this.todoBucketOptions = [];
      }
    });

    this.filteredOptions = this.todoForm.get("title").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  setTodoContentType(content_type) {
    this.todoItem.content_type = content_type;
  }

  private _filter(value: string): Todo[] {
    const filterValue = value.toLowerCase();

    return this.todoBucketOptions.filter(option =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  saveForm() {

    if (this.editFlag) {
      if (this.todoItem.content_type == 1) {
        this.todoItem.title = this.todoForm.get("title").value;
        this.todoItem.active = 0;
        this.todoItem.todo_status = 1;
        this.todoItem.parentId = this.todoForm.get("parentId").value;
        console.log(this.todoItem);
        this.getData.update(this.todoItem).then(data => {
          if (data) {
            this.getData.fetchAllTodos();
            this.dialogRef.close(true);
          }
        });
      } else {
        this.todoItem.title = this.todoForm.get("title").value;
        this.todoItem.active = 0;
        this.todoItem.parentId = 0;
        this.todoItem.todo_status = 1;
        console.log(this.todoItem);
        this.getData.update(this.todoItem).then(data => {
          if (data) {
            this.getData.fetchAllTodos();
            this.dialogRef.close(true);
          }
        });
      }
    } else {
      if (this.todoItem.content_type == 1) {
        this.todoItem.title = this.todoForm.get("title").value;
        this.todoItem.active = 0;
        this.todoItem.todo_status = 1;
        this.todoItem.parentId = this.todoForm.get("parentId").value;
        console.log(this.todoItem);
        this.getData.createTodo(this.todoItem).then(data => {
          if (data) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.todoItem.title = this.todoForm.get("title").value;
        this.todoItem.active = 0;
        this.todoItem.parentId = 0;
        this.todoItem.todo_status = 1;
        console.log(this.todoItem);
        this.getData.createTodo(this.todoItem).then(data => {
          if (data) {
            this.dialogRef.close(true);
          }
        });
      }
    }

  }

  showParent(check) {
    this.showParentFlag = check;
    this.todoForm.get("parentId").reset(0);
  }
}