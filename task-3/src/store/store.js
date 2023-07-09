import {makeAutoObservable} from "mobx";

class Todo {
    todos = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }


    loadFromLocalStorage() {
        const data = localStorage.getItem("todos");
        if (data) {
            this.todos = JSON.parse(data);
        }
    }

    addTodo(todo) {
        this.todos.unshift(todo);
        this.todos.map(todo => delete todo.isEven);
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.todos.map(todo => delete todo.isEven);
    }

    completeTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);

        if (index !== -1) {
            const [removedTodo] = this.todos.splice(index, 1);
            removedTodo.completed = !removedTodo.completed;
            this.todos.push(removedTodo);
        }
    }

    updateTodo(id, editedTodo) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            this.todos[index] = editedTodo;
        }
    }
}

export default new Todo();