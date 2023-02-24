import { createReducer, on, State } from "@ngrx/store";
import { createTodo, createTodoSuccessful, deleteTodo, deleteTodoSuccessful, toggleTodoSuccessful } from "../actions/todo.action";

export interface TodoState {
    id: string;
    text: string;
    done: boolean;
}

const initialState: TodoState[] = [];

export const todoReducer = createReducer(
    initialState,
    on(createTodoSuccessful, (state, { text, done, id }) => [...state, { text, done, id }]),
    on(deleteTodoSuccessful, (state, { todos }) => [...todos]),
    on(toggleTodoSuccessful, (state, { todo, index }) => {
        let modTodos = [...state];
        const modTodo = {...modTodos[index], done: !todo.done};
        modTodos.splice(index, 1, modTodo);
        return modTodos;
    }),
);