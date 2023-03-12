import React, { useState } from "react";
import "./App.css";
import { ToDoList, filterType, tasksType } from "./components/ToDoList";

function App(): JSX.Element {
  const [task, setTask] = useState([
    { id: 1, titleTask: "CSS", isDone: false },
    { id: 2, titleTask: "HTML", isDone: true },
    { id: 3, titleTask: "React", isDone: false },
    { id: 4, titleTask: "Node", isDone: false },
    { id: 5, titleTask: "Hooks", isDone: true },
    { id: 6, titleTask: "State", isDone: false },
  ]);
  const removeTask = (id: number) => {
    setTask(task.filter((t) => t.id !== id));
  };

  const [filter, setFilter] = useState<filterType>("all");
  let filtredTask: Array<tasksType> = [];
  if (filter === "all") {
    filtredTask = task;
  }
  if (filter === "active") {
    filtredTask = task.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    filtredTask = task.filter((t) => t.isDone === true);
  }
  const changeFilter = (status: filterType) => {
    setFilter(status);
  };

  return (
    <div className="App">
      <ToDoList
        changeFilter={changeFilter}
        removeTask={removeTask}
        title="What To Buy"
        tasks={filtredTask}
      />
    </div>
  );
}

export default App;
