import React, { useState } from 'react'
import ShowTodo from './ShowTodo'
import './Todo.css'
function Todo() {

    const [task, setTask] = useState("add some task");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(0);

    const onChangeHandler = (e) => {
        setTask(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        // if (editId) {
        //     const editTask = data.find((curEle,index) => index.id === editId);
        //     const updatedData = data.map((t) =>
        //       t.id === editTask.id
        //         ? (t = { id: t.id, task })
        //         : { id: t.id, task: t.task }
        //     );
        //     setData(updatedData);
        //     setEditId(0);
        //     setTask("");
        //     return;
        //   }

        const newData = task;
        setData([...data, newData])

        setTask('')
    }

    const deleteItem =(a)=>{
        const finalData = data.filter((curEle,index)=>{
            return index !== a;
        })
        setData(finalData)
    }

    const handleEdit = (a) => {
        const editTask = data.find((curEle,index) => index.id === a);
        setTask(editTask.task);
        setEditId(a);
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
                                <input id="todo-input" type="text" className="form-control"  value={task} onChange={onChangeHandler} required />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">{editId ? "Edit" : "ADD"}</button>
                        </div>
                    </form>

                    {data.map((value, index) => {
                        return <ShowTodo
                            key={index}
                            id={index}
                            task={value}
                            
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