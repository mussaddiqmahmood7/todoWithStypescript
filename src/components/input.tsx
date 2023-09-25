import React from "react";
import "./input.css";

interface tasks {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: (event: React.FormEvent) => void;
  setsearch: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ todo, setTodo, submitHandler, setsearch }: tasks) => {
  setsearch("");
  return (
    <>
      <form className="inputSection" onSubmit={submitHandler}>
        <input
          placeholder="Add Task"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default Input;
