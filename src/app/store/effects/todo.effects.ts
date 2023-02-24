import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import * as fromTodoActions from '../actions/todo.action'
import { AppState, selectTodo } from "../app.state";

@Injectable()

export class TodoEffects {

    constructor(private actions$: Actions, private store: Store<AppState>) { }

    deleteEffect = createEffect(() => this.actions$.pipe(
        ofType(fromTodoActions.deleteTodo),
        map(payload => payload.id),
        withLatestFrom(this.store.select(selectTodo)),
        exhaustMap(([id, todo]) => {
            return todo.findIndex(todo => todo.id === id) > -1 ?
                of(fromTodoActions.deleteTodoSuccessful(todo.filter(todo => todo.id !== id))) :
                of(fromTodoActions.deleteTodoFailed("Could not find the todo to delete"))
        })

    ));

    createTodo = createEffect(() => this.actions$.pipe(
        ofType(fromTodoActions.createTodo),
        map(payload => payload.task),
        exhaustMap(task => {
            if (!task) {
                return of(fromTodoActions.createTodoFailed("Your task was empty"))
            }
            const todo = {
                id: JSON.stringify(Math.floor(Math.random() * 1000000000)),
                text: task,
                done: false
            };
            return of(fromTodoActions.createTodoSuccessful(todo));

        })
    ));

    toggleTodo = createEffect(() => this.actions$.pipe(
        ofType(fromTodoActions.toggleTodo),
        map(payload => payload.id),
        withLatestFrom(this.store.select(selectTodo)),
        exhaustMap(([id, todo]) => {
            const todoIndex = todo.findIndex(todo => todo.id === id);
            if (todoIndex > -1) {
                return of(fromTodoActions.toggleTodoSuccessful(todo[todoIndex], todoIndex))
            }
            return of(fromTodoActions.toggleTodoFailed("Toggle Failed"))

        })
    ))

}