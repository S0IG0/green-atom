import Todo from '../store/store'
import {action} from "mobx";

export const even = action(() => {
    Todo.todos.forEach((todo, index) => {
        if (index % 2 === 0) {
            todo.isEven = true;
        }
    })
});
export const odd = action(() => {
    Todo.todos.forEach((todo, index) => {
        if (index % 2 !== 0) {
            todo.isEven = false;
        }
    })
});

export default () => {
    const removeFirst = () => Todo.todos.length !== 0 && Todo.removeTodo(Todo.todos[0].id);
    const removeLast = () => Todo.todos.length !== 0 && Todo.removeTodo(Todo.todos[Todo.todos.length - 1].id);
    return <>
        <div className='text-center'>
            <div className="btn btn-danger m-2" onClick={removeFirst}>Remove first</div>
            <div className="btn btn-danger m-2" onClick={removeLast}>Remove last</div>
            <div className="btn btn-primary m-2" onClick={even}>Even</div>
            <div className="btn btn-primary m-2" onClick={odd}>Odd</div>
        </div>
    </>
}