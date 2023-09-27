import React, { useEffect } from "react";
import { useState } from "react";
import Input from "./components/input";
import Search from "./components/search";
import Todo from "./module";
import "./App.css";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [mode, setMode] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("task");
    const localData = data ? JSON.parse(data) : [];
    setTasks(localData);
  }, []);

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    if (task) {
      const updatedTask = [
        ...tasks,
        { id: Date.now(), todo: task, status: "todo", update: false },
      ];
      setTasks(updatedTask);
      setTask("");
      localStorage.setItem("task", JSON.stringify(updatedTask));
    }
  };

  function completeTaskClick(id: number, target: string) {
    let copyTasks;
    tasks.map((e) => {
      if (e.update == true) e.update = false;
    });

    if (target === "permanentDeleted") {
      copyTasks = [...tasks];
      for (let i = 0; i < tasks.length - 1; i++) {
        if (copyTasks[i].id === id) {
          let index = i;
          while (index < tasks.length - 1) {
            copyTasks[index] = copyTasks[index + 1];
            index++;
          }
          break;
        }
      }
      copyTasks.pop();
    } else {
      copyTasks = tasks.filter((elem) => {
        if (elem.id === id) {
          elem.status = target;
        }
        return elem;
      });
    }
    localStorage.removeItem("task");
    localStorage.setItem("task", JSON.stringify(copyTasks));
    setTasks(copyTasks);
  }

  let completeDiv = tasks
    .filter((elem) => {
      if (search && elem.status === "completed") {
        return elem.todo.toLowerCase().includes(search.toLowerCase());
      } else if (elem.status === "completed") {
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
            <button
              onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}
            >
              D
            </button>
          </div>
        </div>
      );
    });

  function updateTodo(elem: Todo) {
    let copyTasks = tasks.map((e) => {
      if (e.id == elem.id) {
        if (elem.update == true) {
          elem.todo = edit;
        } else {
          tasks.map((e) => {
            if (e.update == true) {
              console.log(e + " was true but i close it");
              e.update = false;
            }
          });
          setEdit(elem.todo);
        }
        e.update = !e.update;
      }
      return e;
    });
    localStorage.removeItem("task");
    localStorage.setItem("task", JSON.stringify(copyTasks));
    setTasks(copyTasks);
  }

  let taskDiv = tasks
    .filter((elem) => {
      if (search && elem.status === "todo") {
        return elem.todo.toLowerCase().includes(search.toLowerCase());
      } else if (elem.todo && elem.status === "todo") {
        return elem;
      }
    })
    .map((elem, index) => {
      let element;
      return (
        <div className="cardTasks">
          <div className="taskHeading">
            {elem.update == false ? (
              <h3>{elem.todo}</h3>
            ) : (
              <div className="updateInput">
                <input
                  value={edit}
                  onChange={(event) => setEdit(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="CUD">
            <button
              onClick={() => {
                completeTaskClick(elem.id, "completed");
              }}
            >
              C
            </button>

            <button
              onClick={() => {
                updateTodo(elem);
              }}
            >
              U
            </button>

            <button
              onClick={() => {
                completeTaskClick(elem.id, "pending");
              }}
            >
              P
            </button>

            <button
              onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}
            >
              D
            </button>
          </div>
        </div>
      );
    });

  let deleteDiv = tasks
    .filter((elem) => {
      if (search && elem.status === "deleted") {
        return elem.todo.toLowerCase().includes(search.toLowerCase());
      } else if (elem.status === "deleted") {
        return elem;
      }
    })
    .map((elem, index) => {
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
            <button
              onClick={() => {
                completeTaskClick(elem.id, "permanentDeleted");
              }}
            >
              D
            </button>
          </div>
        </div>
      );
    });

  let pendingDiv = tasks
    .filter((elem) => {
      if (search && elem.status === "pending") {
        return elem.todo.toLowerCase().includes(search.toLowerCase());
      } else if (elem.status === "pending") {
        return elem;
      }
    })
    .map((elem, index) => {
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
            <button
              onClick={() => {
                completeTaskClick(elem.id, "deleted");
              }}
            >
              D
            </button>
          </div>
        </div>
      );
    });

  let stats = [
    { name: "Total Tasks", static: tasks.length },
    { name: "Todo Tasks", static: taskDiv.length },
    { name: "Completed Tasks", static: completeDiv.length },
    { name: "Pending Tasks", static: pendingDiv.length },
    { name: "Deleted Tasks", static: deleteDiv.length },
  ];

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
  });

  return (
    <div className="main">
      <h1 className="heading">ToDo List</h1>
      {mode === "search" ? (
        <Search find={search} toFind={setSearch} all={tasks} />
      ) : (
        <Input
          todo={task}
          setTodo={setTask}
          submitHandler={submitHandler}
          setsearch={setSearch}
          all={tasks}
        />
      )}
      <div className="inputSearchButton">
        <button
          className="inputButton"
          onClick={() => {
            setMode("input");
          }}
        >
          Add Task
        </button>
        <button
          className="searchButton"
          onClick={() => {
            setMode("search");
          }}
        >
          Search Task
        </button>
      </div>

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
