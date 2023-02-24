import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState, todoReducer } from "./reducers/todo.reducer";
import { UIReducer, UIState } from "./reducers/ui.reducer";

export interface AppState {
    todo: TodoState[],
    ui: UIState
}

export const reducers = {
    todo: todoReducer,
    ui: UIReducer
}

export const selectTodoState = createFeatureSelector<TodoState[]>('todo');
export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectTodo = createSelector(selectTodoState, (todoState) => todoState);
export const selectUI = createSelector(selectUIState, (uiState) => uiState);