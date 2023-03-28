import React, { useState } from "react";
import "./App.css";
import { ToDoList, filterType, tasksType } from "./components/ToDoList";
import { v1 } from "uuid";

function App(): JSX.Element {
  const [task, setTask] = useState([
    { id: v1(), titleTask: "CSS", isDone: false },
    { id: v1(), titleTask: "HTML", isDone: true },
    { id: v1(), titleTask: "React", isDone: false },
    { id: v1(), titleTask: "Node", isDone: false },
    { id: v1(), titleTask: "Hooks", isDone: true },
    { id: v1(), titleTask: "State", isDone: false },
  ]);
  const removeTask = (id: string) => {
    setTask(task.filter((t) => t.id !== id));
  };
  const changeCeckboxStatus = (taskId: string, taskIsDone: boolean) => {
    setTask(
      task.map((t) => (t.id === taskId ? { ...t, isDone: taskIsDone } : t))
    );
  };
  const addTask = (title: string) => {
    const newTitle = { id: v1(), titleTask: title, isDone: false };
    setTask([newTitle, ...task]);
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
        changeCeckboxStatus={changeCeckboxStatus}
        changeFilter={changeFilter}
        removeTask={removeTask}
        title="What To Buy"
        tasks={filtredTask}
        addTask={addTask}
        filter={filter}
      />
    </div>
  );
}

export default App;
