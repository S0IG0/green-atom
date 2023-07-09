import Todo from "../store/store"

export default ({todo, setTodo}) => {
    return <>
        <form style={{width: '80em'}} className='m-auto mt-4 mb-4'>
            <div className="mb-3">
                <label className="form-label">Title todo</label>
                <input onChange={event => setTodo({...todo, title: event.target.value})}
                       value={todo.title}
                       type="text" className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description todo</label>
                <textarea
                    onChange={event => setTodo({...todo, description: event.target.value})}
                    value={todo.description}
                    className="form-control"/>
            </div>
            <button
                type='button'
                className="btn btn-primary"
                onClick={() => {
                    if (todo.id) {
                        Todo.updateTodo(todo.id, todo)
                    } else {
                        Todo.addTodo({...todo, id: new Date()});
                    }
                    setTodo({title: '', description: '', completed: false});
                }}
                disabled={todo.title === '' || todo.description === ''}
            >
                {todo.id ? 'Edit' : 'Create'}
            </button>
        </form>
    </>
}