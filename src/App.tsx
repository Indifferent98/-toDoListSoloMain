import React from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";

function App(): JSX.Element {
  const task1 = [
    { id: 1, titleTask: "CSS", isDone: true },
    { id: 2, titleTask: "HTML", isDone: false },
    { id: 3, titleTask: "React", isDone: true },
  ];
  const task2 = [
    { id: 1, titleTask: "It", isDone: false },
    { id: 2, titleTask: "Math", isDone: false },
    { id: 3, titleTask: "Russ", isDone: false },
  ];
  return (
    <div className="App">
      <ToDoList title="What To Buy" tasks={task1} />
      <ToDoList title="What To Read" tasks={task2} />
      <ToDoList title="What To Learn" tasks={task2} />
    </div>
  );
}

export default App;
