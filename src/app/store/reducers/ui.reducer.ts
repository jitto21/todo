import { createReducer, on } from "@ngrx/store";
import { createTodo, createTodoFailed, deleteTodo, deleteTodoFailed, deleteTodoSuccessful, toggleTodo, toggleTodoFailed } from "../actions/todo.action";

export interface UIState {
    errorMsg: string | null;
}

const initialState: UIState = {errorMsg: null};

export const UIReducer = createReducer(
    initialState,
    on(createTodo, toggleTodo, deleteTodo, (state) => initialState),
    on(createTodoFailed, deleteTodoFailed, (state, {errorMsg}) => ({...state, errorMsg}))
);