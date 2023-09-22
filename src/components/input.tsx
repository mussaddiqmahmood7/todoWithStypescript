import React from 'react';
import './input.css';

interface tasks{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    submitHandler:(event:React.FormEvent)=>void;
}

const Input=({todo, setTodo, submitHandler}:tasks)=>{

    return<>
        <form className="inputSection" onSubmit={submitHandler}>
          <input placeholder="Enter Task" value={todo} onChange={(event)=>{setTodo(event.target.value)}}/>
          <button type="submit">Go</button>
        </form>
    </>
}

export default Input