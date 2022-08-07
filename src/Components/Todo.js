import React, { useState } from 'react'
import ShowTodo from './ShowTodo'
import './Todo.css'
function Todo() {

    const [task, setTask] = useState("add some task");
    const [data, setData] = useState([]);
    
    const [editId, setEditId] = useState(0);

  

    const submitHandler = (e) => {
        e.preventDefault();

        if (editId) {
            const editTask = data.find((i) => i.id === editId);
            const updatedData = data.map((t) =>
              t.id === editTask.id
                ? (t = { id: t.id, task })
                : { id: t.id, task: t.task }
            );
            setData(updatedData);
            setEditId(0);
            setTask("");
            return;
          }

        if (task !== "") {
            setData([{ id: `${task}-${Date.now()}`, task }, ...data]);
            setTask("");
          }
        };

    const deleteItem =(id)=>{
        const delTask = data.filter((to) => to.id !== id);
        setData([...delTask]);
    }

    const handleEdit = (id) => {
        const editTask = data.find((i) => i.id === id);
        setTask(editTask.task);
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
                                <input id="todo-input" type="text" className="form-control"  value={task} onChange={(e) => setTask(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">{editId ? "Edit" : "ADD"}</button>
                        </div>
                    </form>

                    {data.map((t) => {
                        return <ShowTodo
                            key={t.id}
                            id={t.id}
                            task={t.task}
                            
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