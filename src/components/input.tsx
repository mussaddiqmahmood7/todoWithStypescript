import React from "react";
import "./input.css";

interface Todo {
  id: number;
  todo: string;
  status: string | "todo" | "completed" | "pending" | "deleted";
  update: boolean;
}

interface tasks {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: (event: React.FormEvent) => void;
  setsearch: React.Dispatch<React.SetStateAction<string>>;
  all: Todo[];
}

const Input = ({ todo, setTodo, submitHandler, setsearch, all }: tasks) => {
  setsearch("");
  all.map((e) => {
    if (e.update == true) {
      e.update = false;
    }
  });
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
