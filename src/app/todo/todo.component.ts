import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { createTodo, deleteTodo, toggleTodo } from '../store/actions/todo.action';
import { AppState, selectTodo, selectUI } from '../store/app.state';
import { TodoState } from '../store/reducers/todo.reducer';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todos: TodoState[] = [];

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.select(selectTodo).subscribe(todoState => {
      this.todos = todoState ?? [];
    });
    this.store.select(selectUI).subscribe(({ errorMsg }) => {
      if (errorMsg !== null) {
        return this.openSnackBar(errorMsg, 'OK');
      }
      this._snackBar.dismiss();
    })
  }

  addTask(task: string) {
    this.store.dispatch(createTodo(task));
  }
  removeTask(id: string) {
    this.store.dispatch(deleteTodo(id))
  }
  toggle(id: string) {
   // task.done = !task.done;
    this.store.dispatch(toggleTodo(id))
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

export interface Todo {
  text: string;
  done: boolean;
}
