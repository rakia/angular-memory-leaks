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

  createTodo(): void {
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '300px',
      data: { mode: 'create' }
    });
    dialogRef.afterClosed().subscribe((result: TODO) => {});
  }

  updateTodo(todo: TODO) {
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '300px',
      data: { todo: todo, mode: 'update' }
    });
    dialogRef.afterClosed().subscribe((result: TODO) => {});
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
