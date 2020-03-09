import {TODO} from '../todo.model';

export interface TodoDialogData {
  todos?: TODO[];
  mode: string; // 'create' | 'update'
}
