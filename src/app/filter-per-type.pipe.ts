import { Pipe, PipeTransform } from '@angular/core';

import { TODO } from './todo.model';

/*
 * This is a pure pipe.
 * An impure pipe is called often, as often as every keystroke or mouse-move.
 * An expensive, long-running pipe could destroy the user experience.
 */
@Pipe({
  name: 'filterPerType',
  pure: true
})
export class FilterPerTypePipe implements PipeTransform {

  transform(allTodos: TODO[], type: string): TODO[] {
    return allTodos.filter(todo => {
      if (type === 'Coding' || type === 'Reading') {
        return todo.type !== 'Writing';
      } else {
        return true;
      }
    });
  }
}
