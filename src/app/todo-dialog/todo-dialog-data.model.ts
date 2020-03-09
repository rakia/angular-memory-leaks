import {TODO} from '../todo.model';

export interface TodoDialogData {
  todo?: TODO;
  mode: string; // 'create' | 'update'
}
