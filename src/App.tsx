import React from "react";
import { useState } from "react";
import Input from "./components/input";
import Todo from "./module";
import "./App.css";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    setTasks([...tasks, { id: Date.now(), todo: task, isDone: false }]);
    setTask("");
  };

  function completeTaskClick(index: number) {
    console.log("\nIndex : "+ index);
    console.log("tasks : ");
    console.log(...tasks);
    let copyTasks = [...tasks];
    copyTasks[index].isDone = true;
    setTasks(copyTasks);
    console.log("tasks : ");
    console.log(...tasks);
  }

  function restoreCompleteTask(index: number) {
    console.log("tasks before : ");
    console.log(...tasks);
    let copyTasks = [...tasks];
    copyTasks[index].isDone = false;
    console.log("tasks after : ");
    console.log(...copyTasks);

    setTasks(copyTasks);
  }

  let completeDiv = tasks.filter((elem) => {
      if (elem.isDone === true) {
        return elem;
      }
    })
    .map((elem, index) => {
      return (
        <div className="card">
          <div className="taskHeading">
            <h3>{elem.todo}</h3>
            <p> : </p>
            <p>{elem.isDone ? "Complete" : "Not Complete"}</p>
          </div>

          <div className="CUD">
            <button
              onClick={() => {
                restoreCompleteTask(index);
              }}
            >
              R
            </button>
            <button>D</button>
          </div>
        </div>
      );
    });



  let taskDiv = tasks.filter((elem) => {
    if (elem.isDone === false) {
      return elem;
    }
  }).map((elem, index) => {
      return (
        <div className="card">
          <div className="taskHeading">
            <h3>{elem.todo}</h3>
            <p> : </p>
            <p>{elem.isDone ? "Complete" : "Not Complete"}</p>
          </div>

          <div className="CUD">
            <button
              onClick={() => {
                completeTaskClick(index);
              }}
            >
              C
            </button>
            <button>U</button>
            <button>D</button>
          </div>
        </div>
      );
    })


  return (
    <div className="main">
      <h1 className="heading">ToDo List</h1>
      <Input todo={task} setTodo={setTask} submitHandler={submitHandler} />

      <div className="mainSection">
        <div className="tasksStats">
          <h2>Tasks Statics</h2>
        </div>

        <div className="tasksSection">
          <h2>Tasks Todo</h2>
          {taskDiv}
        </div>

        <div className="completeSection">
          <h2>Completed</h2>
          {completeDiv}
        </div>
      </div>
    </div>
  );
};

export default App;
