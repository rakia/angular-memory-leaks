import { BrowserModule           } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule                } from '@angular/core';
import { FlexModule              } from '@angular/flex-layout';
import { ReactiveFormsModule     } from '@angular/forms';
import { RouterModule            } from '@angular/router';
import { MatListModule           } from '@angular/material/list';
import { MatButtonModule         } from '@angular/material/button';
import { MatCardModule           } from '@angular/material/card';
import { MatDialogModule         } from '@angular/material/dialog';
import { MatToolbarModule        } from '@angular/material/toolbar';
import { MatTooltipModule        } from '@angular/material/tooltip';
import { MatFormFieldModule      } from '@angular/material/form-field';
import { MatInputModule          } from '@angular/material/input';
import { MatSelectModule         } from '@angular/material/select';

import { AppComponent            } from './app.component';
import { TopBarComponent         } from './top-bar/top-bar.component';
import { TodoListComponent       } from './todo-list/todo-list.component';
import { TodoDialog              } from './todo-dialog/todo.dialog';
import { FilterPerTypePipe       } from './filter-per-type.pipe';

@NgModule({
  declarations: [ AppComponent, TopBarComponent, TodoListComponent, TodoDialog, FilterPerTypePipe ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{path: '', component: TodoListComponent}]),
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
