import { createAction } from "@ngrx/store";
import { TodoState } from "../reducers/todo.reducer";

export const createTodo = createAction('[Todo] Create', (task: string) => ({task}));
export const createTodoFailed = createAction('[Todo] Create Failed', (errorMsg: string) => ({errorMsg}));
export const createTodoSuccessful = createAction('[Todo] Create Successful', (todo: TodoState) => todo);

export const toggleTodo = createAction('[Todo] Toggle', (id: string) => ({id}));
export const toggleTodoFailed = createAction('[Todo] Toggle Failed', (errorMsg: string) => ({errorMsg}));
export const toggleTodoSuccessful = createAction('[Todo] Toggle Successful', (todo: TodoState, index: number) => ({todo, index}));

export const deleteTodo = createAction('[Todo] Delete', (id: string) => ({id}));
export const deleteTodoFailed = createAction('[Todo] Delete Failed', (errorMsg: string) => ({errorMsg}));
export const deleteTodoSuccessful = createAction('[Todo] Delete Successful', (todos: TodoState[]) => ({todos}));
