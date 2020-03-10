import { Component, Inject, OnDestroy, OnInit          } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef                 } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription                         } from 'rxjs';
import { takeUntil                                     } from 'rxjs/operators';

import { TODO           } from '../todo.model';
import { TodoDialogData } from './todo-dialog-data.model';
import { TodoService    } from '../todo.service';

@Component({
  selector: 'todo.dialog',
  templateUrl: 'todo.dialog.html',
  styleUrls: ['./todo.dialog.css']
})
export class TodoDialog implements OnInit, OnDestroy {

  todosForm:        FormGroup;
  type:             string;
  types:            string[] = [];
  todoList:         TODO[]   = [];
  filteredTodoList: TODO[]   = []; // { coding: [], reading: [], writing: [] };
  mode:             string   = 'create'; // 'create' | 'update'

  destroy$: Subject<boolean> = new Subject<boolean>();
  formChangesUnsubscriptions: Subscription[] = [];
  typeChangesUnsubscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              public todoService: TodoService,
              public dialogRef: MatDialogRef<TodoDialog>,
              @Inject(MAT_DIALOG_DATA) public data: TodoDialogData) {
  }

  get todosFormArray(): FormArray {
   return this.todosForm.get('todos') as FormArray;
  }

  ngOnInit() {
    this.mode = this.data.mode;

    this.todoService.getTodos().pipe(takeUntil(this.destroy$)).subscribe(todos => {
      this.todoList         = todos;
      this.filteredTodoList = this.todoList;
    });
    this.todoService.getTypes().pipe(takeUntil(this.destroy$)).subscribe(types => this.types = types);

    const index     = 0;
    const formGroup = this.createTodoForm(this.data.todos[0], index);
    this.todosForm  = this.formBuilder.group({
      todos: new FormArray([formGroup])
    });
  }

  addTodo() {
    const index     = this.todosFormArray.controls.length;
    const formGroup = this.createTodoForm(null, index);
    this.todosFormArray.push(formGroup);
  }

  createTodoForm(todo: TODO, index: number): FormGroup {
    const formGroup = this.formBuilder.group({
      index:        [index],
      id:           [todo?.id],
      name:         [todo?.name        , [Validators.required]],
      type:         [todo?.type        , [Validators.required]],
      dependencies: [todo?.dependencies, []],
      description:  [todo?.description , []]
    });
    this.formChangesUnsubscriptions[index] = formGroup.valueChanges.subscribe(value => {
      console.log('form ' + index + ': value changed');
    });
    this.typeChangesUnsubscriptions[index] = formGroup.get('type').valueChanges.subscribe(selectedType => {
      console.log('form ' + index + ': type changed to: ' + selectedType);
      this.filteredTodoList = this.filterTodoListPerType(selectedType);
    });
    return formGroup;
  }

  filterTodoListPerType(type: string): TODO[] {
    return this.todoList.filter(todo => {
      if (type === 'Writing') {
        return true;
      } else {
        return todo.type !== 'Writing';
      }
    });
  }

  deleteTodoForm(formIndex: number) {
    this.formChangesUnsubscriptions[formIndex].unsubscribe();
    this.typeChangesUnsubscriptions[formIndex].unsubscribe();
    this.todosFormArray.removeAt(formIndex);
    this.todosFormArray.controls.forEach((formGroup, index) => {
      formGroup.get('index').setValue(index, {onlySelf: true, emitEvent: false});
    });
  }

  save(): void {
    this.dialogRef.close(this.todosFormArray.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.formChangesUnsubscriptions.forEach(value => value.unsubscribe());
    this.typeChangesUnsubscriptions.forEach(value => value.unsubscribe());
  }
}
