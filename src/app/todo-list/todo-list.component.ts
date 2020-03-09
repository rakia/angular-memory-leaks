import { Component, OnInit } from '@angular/core';
import { MatDialog         } from '@angular/material/dialog';

import { TODO              } from '../todo.model';
import { TodoDialog        } from '../todo-dialog/todo.dialog';
import { TodoService       } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: TODO[];

  constructor(public dialog: MatDialog, public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => this.todoList = todos);
  }

  openTodoDialog(mode: string, todo?: TODO): void { // mode = 'create' | 'update'
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '800px',
      data: { mode: mode, todos: todo ? [todo] : [] }
    });
    dialogRef.afterClosed().subscribe((result: TODO[]) => {
      if (result) {
        this.todoService.updateTodoList(result, mode);
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
