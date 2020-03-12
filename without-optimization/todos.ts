import { TODO } from './todo.model';

export const TYPES: string[] = ['Coding', 'Reading', 'Writing'];

export const TODOS: TODO[] = [
  {
    name: 'Read tutorial',
    id: 1,
    type: 'Reading',
    description: 'Reasons for memory leaks'
  },
  {
    name: 'Write article',
    id: 2,
    type: 'Writing',
    description: 'Angular 9 app with memory leaks'
  },
  {
    name: 'Implement app',
    id: 3,
    type: 'Coding',
    description: 'Angular 9 app with memory leaks'
  }
];
