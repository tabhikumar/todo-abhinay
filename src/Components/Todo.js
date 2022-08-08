import React, { useState } from 'react'
import ShowTodo from './ShowTodo'
import './Todo.css'
function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);

    const submitHandler = (e) => {

        e.preventDefault();
        
        if (todo) {
            setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
            setTodo("");
          }

        if (editId) {
            const editTodo = todos.find((i) => i.id === editId);
            const updatedTodos = todos.map((t) =>
              t.id === editTodo.id
                ? (t = { id: t.id, todo })
                : { id: t.id, todo: t.todo }
            );
            setTodos(updatedTodos);
            setEditId(0);
            setTodo("");
            return;
          }

        };

    const deleteItem =(id)=>{
        const delTodo = todos.filter((t) => t.id !== id);
        setTodos([...delTodo]);
    }

    const handleEdit = (id) => {
        const editTodo = todos.find((i) => i.id === id);
        setTodo(editTodo.todo);
        setEditId(id);
      };
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center main-row">
                <div className="col shadow main-col bg-white">
                    <div className="row bg-primary text-white">
                        <div className="col  p-2">
                            <h4 className='text-center'>Todo App Using React JS</h4>
                        </div>
                    </div>
                    <form onSubmit={submitHandler} >
                        <div className="row justify-content-between text-white p-2">
                            <div className="form-group flex-fill mb-2 col-9">
                                <input id="todo-input" type="text" className="form-control" placeholder='Add Your Task Here' value={todo} onChange={(e) => setTodo(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">{editId ? "Edit" : "ADD"}</button>
                        </div>
                    </form>

                    {todos.map((t) => {
                        return <ShowTodo
                            key={t.id}
                            id={t.id}
                            todo={t.todo}
                            onSelcet={deleteItem}
                            handleEdit={handleEdit}
                        />
                    })}


                </div>
            </div>
        </div>
    )
}

export default Todo