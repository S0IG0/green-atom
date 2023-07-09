import {observer} from "mobx-react-lite";
import {createContext, useState} from "react";
import TodoForm from "./ui/TodoForm";
import ListTodo from "./ui/TodoList";
import Todo from './store/store'
import ControlPanel from "./ui/ControlPanel";

export const Context = createContext();

function App() {
    const [todo, setTodo] = useState({title: '', description: '', completed: false});
    return (
        <Context.Provider value={setTodo}>
            <TodoForm todo={todo} setTodo={setTodo}></TodoForm>
            <ControlPanel></ControlPanel>
            <ListTodo todos={Todo.todos}></ListTodo>
        </Context.Provider>
    );
}

export default observer(App);
