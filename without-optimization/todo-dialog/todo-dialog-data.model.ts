import {TODO} from '../todo.model';

export interface TodoDialogData {
  todos?: TODO[];
  // dependencies: TODO[];
  // types: string[];
  mode: string; // 'create' | 'update'
}
