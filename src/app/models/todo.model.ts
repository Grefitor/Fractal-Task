export class Todo {
         todoId: number;
         parentId: number;
         title: string;
         content: string;
         todo_status: number;
         content_type: number;
         creation_date: Date;
         active: number;
         task: Array<Todo>;

         constructor(
           data: {
             todoId?: number;
             parentId?: number;
             title?: string;
             content?: string;
             todo_status?: number;
             active?: number;
             creation_date?: Date;
             content_type?: number;
             task?: Array<Todo>;
           } = {}
         ) {
           this.todoId = data.todoId;
           this.parentId = data.parentId;
           this.title = data.title || '';
           this.content = data.content || '';
           this.content_type = data.content_type;
           this.todo_status = data.todo_status || 1;
           this.creation_date = data.creation_date;
           this.active = data.active;
           this.task = data.task || [];
         }
       }