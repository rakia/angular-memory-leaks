import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef                 } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Subject        } from 'rxjs';
// import { takeUntil      } from 'rxjs/operators';

import { TODO           } from '../todo.model';
import { TodoDialogData } from './todo-dialog-data.model';
// import { TodoService    } from '../todo.service';

@Component({
  selector: 'todo.dialog',
  templateUrl: 'todo.dialog.html',
  styleUrls: ['./todo.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDialog implements OnInit, OnDestroy {

  todosForm:        FormGroup;
  type:             string;
  types:            string[] = [];
  dependencies:         TODO[]   = [];
  // filteredTodoList: TODO[]   = [];
  mode:             string   = 'create'; // 'create' | 'update'

  //destroy$: Subject<boolean> = new Subject<boolean>();
  // typeChangesUnsubscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              // public todoService: TodoService,
              public dialogRef: MatDialogRef<TodoDialog>,
              @Inject(MAT_DIALOG_DATA) public data: TodoDialogData) {
  }

  get todosFormArray(): FormArray {
   return this.todosForm.get('todos') as FormArray;
  }

  ngOnInit() {
    this.mode         = this.data.mode;
    this.dependencies = this.data.dependencies;
    this.types        = this.data.types;


    /*this.todoService.getTodos().pipe(takeUntil(this.destroy$)).subscribe(todos => {
      this.dependencies        = todos;
      // this.filteredTodoList = this.dependencies;
    });*/
    // this.todoService.getTypes().pipe(takeUntil(this.destroy$)).subscribe(types => this.types = types);

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
    // this.typeChangesUnsubscriptions[index] = formGroup.get('type').valueChanges.subscribe(selectedType => {
    //   this.filteredTodoList = this.filterTodoListPerType(selectedType);
    // });
    return formGroup;
  }

  // filterTodoListPerType(type: string): TODO[] {
  //   return this.dependencies.filter(todo => {
  //     if (type === 'Writing') {
  //       return true;
  //     } else {
  //       return todo.type !== 'Writing';
  //     }
  //   });
  // }

  deleteTodoForm(formIndex: number) {
    // this.typeChangesUnsubscriptions[formIndex].unsubscribe();
    this.todosFormArray.removeAt(formIndex);
    this.todosFormArray.controls.forEach((formGroup, index) => {
      formGroup.get('index').setValue(index, {onlySelf: true, emitEvent: false});
    });
  }

  save(): void {
    this.dialogRef.close(this.todosFormArray.value);
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
    // this.typeChangesUnsubscriptions.forEach(value => value.unsubscribe());
  }
}
