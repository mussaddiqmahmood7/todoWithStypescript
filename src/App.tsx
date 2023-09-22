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
    setTasks([...tasks, { id: Date.now(), todo: task, status: 'todo' }]);
    setTask("");
  };

  function completeTaskClick(id: number , target: string) {
    console.log("before : ");
    console.log(...tasks);
    let copyTasks = tasks.filter((elem)=>{if(elem.id===id){
      elem.status = target;
    } return elem;})
    setTasks(copyTasks);
    console.log("after : ");
    console.log(...tasks);

  }



  let completeDiv = tasks.filter((elem) => {
       if (elem.status === 'completed') {
         return elem;
       }
    })
    .map((elem, index) => {
      return (
        <div className="cardCompleted">
          <div className="taskHeading">
            <h3>{elem.todo}</h3>
          </div>

          <div className="CUD">
            <button
              onClick={() => {
                completeTaskClick(elem.id, "todo");
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
    if (elem.status === "todo") {
      return elem;
    }
  }).map((elem, index) => {
      return (
        <div className="cardTasks">
          <div className="taskHeading">
            <h3>{elem.todo}</h3>
          </div>

          <div className="CUD">
            <button
              onClick={() => {
                completeTaskClick(elem.id, "completed");
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





  let stats=[{name:"Total Tasks", static:tasks.length}, {name:"Todo Tasks", static:taskDiv.length}, {name:"Completed Tasks", static:completeDiv.length}, {name:"Pending Tasks", static:0}, {name:"Deleted Tasks", static:0}];

  let taskStats = stats.map((elem, index) => {
    return (
      <div className="cardStats">
        <div className="taskHeading">
          <h3>{elem.name}</h3>
        </div>

        <div className="CUD">
        <h3>{elem.static}</h3>
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
          {taskStats}
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
