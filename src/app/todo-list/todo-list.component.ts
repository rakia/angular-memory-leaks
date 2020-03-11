import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog         } from '@angular/material/dialog';
import { Subject           } from 'rxjs';
import { takeUntil         } from 'rxjs/operators';

import { TODO              } from '../todo.model';
import { TodoDialog        } from '../todo-dialog/todo.dialog';
import { TodoService       } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoList: TODO[];
  types: string[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog, public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().pipe(takeUntil(this.destroy$)).subscribe(todos => this.todoList = todos);
    this.todoService.getTypes().pipe(takeUntil(this.destroy$)).subscribe(types => this.types = types);
  }

  openTodoDialog(mode: string, todo?: TODO): void { // mode = 'create' | 'update'
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '800px',
      data: { mode: mode, todos: todo ? [todo] : [], dependencies: this.todoList, types: this.types },
      disableClose: true
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
