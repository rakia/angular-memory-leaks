import { Injectable     } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TODO           } from './todo.model';
import { TODOS, TYPES   } from './todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: TODO[];
  types: string[];

  constructor() {}

  getTodos(): Observable<TODO[]> {
    this.todoList = TODOS;
    return of(this.todoList);
  }

  getTypes(): Observable<string[]> {
    this.types = TYPES;
    return of(this.types);
  }

  updateTodoList(todo: TODO, mode: string) {
    if (mode === 'create') {
      todo.id = this.todoList.length + 1;
      this.todoList.push(todo);
    }
    if (mode === 'update') {
      this.todoList[todo.id - 1] = todo;
    }
  }

  deleteTodo(id: number) {
    this.todoList.splice(id - 1, 1);

    this.todoList.forEach((todo, index) => {
      if (todo.dependencies?.id === id) {
        todo.dependencies = null;
      }
      todo.id = index + 1;
    });
  }
}
