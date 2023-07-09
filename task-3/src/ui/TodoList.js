import {observer} from "mobx-react-lite";
import Todo from "./Todo";

export default observer(({todos}) => {
    return <>
        <ul className='text-start list-group list-group-flush m-4 m-auto' style={{maxWidth: '80em'}}>
            {todos.map((todo) => (
                <Todo todo={todo} key={todo.id}></Todo>
            ))}
        </ul>
    </>
});