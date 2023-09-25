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
    
    let copyTasks = tasks.filter((elem)=>{if(elem.id===id){
      elem.status = target;
    } return elem;})
    
    setTasks(copyTasks);
    

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
            <button  onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}>D</button>
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

            <button onClick={() => {
                completeTaskClick(elem.id, "pending");
              }}>P
              </button>
            
            <button  onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}>D</button>
          </div>
        </div>
      );
    })
 


 
    let deleteDiv = tasks.filter((elem) => {
    if (elem.status === "deleted") {
      return elem;
    }
  }).map((elem, index) => {
      return (
        <div className="cardDeleted">
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
            <button onClick={() => {
                completeTaskClick(elem.id, "permanentDeleted");
            }}>D</button>
          </div>
        </div>
      );
    })


    let pendingDiv = tasks.filter((elem) => {
    if (elem.status === "pending") {
      return elem;
    }
  }).map((elem, index) => {
      return (
        <div className="cardPending">
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
            <button onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}>D</button>
          </div>
        </div>
      );
    })





  let stats=[{name:"Total Tasks", static:tasks.length}, {name:"Todo Tasks", static:taskDiv.length}, {name:"Completed Tasks", static:completeDiv.length}, {name:"Pending Tasks", static:pendingDiv.length}, {name:"Deleted Tasks", static:deleteDiv.length}];

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
   

  console.log(tasks.length);





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
        
        <div className="deletedSection">
          <h2>Deleted</h2>
          {deleteDiv}
        </div>
        
        <div className="pendingSection">
          <h2>Pending</h2>
          {pendingDiv}
        </div>
        
      </div>
    </div>
  );
};

export default App;
