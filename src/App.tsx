import React, { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";

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

  return (
    <div className="App">
      <ToDoList removeTask={removeTask} title="What To Buy" tasks={task} />
    </div>
  );
}

export default App;
