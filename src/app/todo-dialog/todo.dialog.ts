import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TODO} from '../todo.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoDialogData} from './todo-dialog-data.model';
import {TodoService} from '../todo.service';

@Component({
  selector: 'todo.dialog',
  templateUrl: 'todo.dialog.html',
  styleUrls: ['./todo.dialog.css']
})
export class TodoDialog implements OnInit {

  todoForm:         FormGroup;
  name:             string;
  type:             string;
  dependencies:     TODO;
  description:      string;
  types:            string[] = [];
  todoList:         TODO[]   = [];
  filteredTodoList: TODO[]   = [];

  constructor(private formBuilder: FormBuilder,
              public todoService: TodoService,
              public dialogRef: MatDialogRef<TodoDialog>,
              @Inject(MAT_DIALOG_DATA) public data: TodoDialogData) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todoList         = todos;
      this.filteredTodoList = this.todoList;
    });
    this.todoService.getTypes().subscribe(types => this.types = types);

    this.todoForm = this.formBuilder.group({
      id:           [this.data.todo?.id],
      name:         [this.data.todo?.name        , [Validators.required]], // new FormControl(this.event.title),
      type:         [this.data.todo?.type        , [Validators.required]],
      dependencies: [this.data.todo?.dependencies, []],
      description:  [this.data.todo?.description , []]
    });

    this.todoForm.valueChanges.subscribe(value => {
      console.log('form value changed');
    });

    this.todoForm.get('type').valueChanges.subscribe(selectedType => {
      console.log('type changed');
      this.filteredTodoList = this.todoList.filter(todo => {
        if (selectedType === 'Reading' || selectedType === 'Coding') {
          return todo.type !== 'Writing';
        } else {
          return true;
        }
      });
    })
  }

  save(): void {
    this.todoService.updateTodoList(this.todoForm.value, this.data.mode);
    this.dialogRef.close(this.todoForm.value);
  }

}
