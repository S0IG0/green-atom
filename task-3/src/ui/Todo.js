import Todo from '../store/store'
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../App";

export default observer(({todo}) => {
    const setTodo = useContext(Context);
    return <>
        <div className='list-group-item'>
            <div className='fs-3' style={{textTransform: 'uppercase'}}>
                {todo.completed ? <s>{todo.title}</s> : todo.title}
            </div>
            {todo.completed ? <s>{todo.description}</s> : todo.description} <br></br>
            <div className={todo.completed ? 'btn btn-primary mt-4' : 'btn btn-success mt-4'}
                 onClick={() => Todo.completeTodo(todo.id)}>
                {todo.completed ? 'Uncompleted' : 'Complete'}
            </div>
            <div className='btn btn-danger ms-2 mt-4' onClick={() => Todo.removeTodo(todo.id)}>Remove</div>
            <div className='btn btn-success ms-2 mt-4' onClick={() => setTodo(todo)}>Edit</div>
            <div
                className='mt-1'
                style={{
                    background: todo.isEven === true ? 'red' : todo.isEven === false && 'blue',
                    opacity: '0.2',
                    height: '5px',
                    borderRadius: '2px'
                }}></div>
        </div>
    </>
});