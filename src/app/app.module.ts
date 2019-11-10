import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todos/todo/todo.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CreateNewTodoComponent } from './create-new-todo/create-new-todo.component';
import { GetTodoDataService } from './services/get-todo-data.service';
import { TodoBucketComponent } from './todo-bucket/todo-bucket.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { DemoMaterialModule } from './material/material.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule
  ],
  declarations: [
    AppComponent,
    TodoComponent,
    CreateNewTodoComponent,
    TodoBucketComponent,
    TodoItemComponent
  ],
  bootstrap: [AppComponent],
  providers: [GetTodoDataService],
  entryComponents: [CreateNewTodoComponent]
})
export class AppModule {}
