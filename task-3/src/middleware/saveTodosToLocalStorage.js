import {reaction} from "mobx";
import Todo from "../store/store";


export const saveTodosToLocalStorage = reaction(
    () => ({
        todos: Todo.todos.map(todo => ({...todo}))
    }), data => {
        const stringify = JSON.stringify(data.todos);
        localStorage.setItem('todos', stringify);
    }
);
