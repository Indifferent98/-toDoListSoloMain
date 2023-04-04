import React, { useState } from "react";
import "./App.css";
import { ToDoList, filterType, tasksType } from "./components/ToDoList";
import { v1 } from "uuid";

function App(): JSX.Element {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  type toDolistType = {
    id: string;

    title: string;
    filter: filterType;
  };
  type tasksType = {
    id: string;
    isDone: boolean;
    title: string;
  };
  type useStateToDoListType = {
    [id: string]: tasksType[];
  };
  const [toDoList, setToDoList] = useState<toDolistType[]>([
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
    },
  ]);
  const [task, setTask] = useState<useStateToDoListType>({
    [toDoListId_1]: [
      { id: v1(), title: "CSS", isDone: false },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Node", isDone: false },
      { id: v1(), title: "Hooks", isDone: true },
      { id: v1(), title: "State", isDone: false },
    ],
    [toDoListId_2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Beer", isDone: false },
      { id: v1(), title: "Cucumber", isDone: false },
      { id: v1(), title: "Salt", isDone: true },
      { id: v1(), title: "Sugar", isDone: false },
    ],
  });
  const removeTask = (id: string, toDoListId: string) => {
    setTask({
      ...task,
      [toDoListId]: task[toDoListId].filter((t) => t.id !== id),
    });
  };
  const changeCeckboxStatus = (
    taskId: string,
    taskIsDone: boolean,
    toDoListId: string
  ) => {
    setTask({
      ...task,
      [toDoListId]: task[toDoListId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskIsDone } : t
      ),
    });
  };
  const addTask = (title: string, toDoListId: string) => {
    const newTitle = { id: v1(), title: title, isDone: false };
    setTask({ ...task, [toDoListId]: [newTitle, ...task[toDoListId]] });
  };
  // const [filter, setFilter] = useState<filterType>("all");

  // if (filter === "all") {
  //   filtredTask = task;
  // }
  // if (filter === "active") {
  //   filtredTask = task.filter((t) => t.isDone === false);
  // }
  // if (filter === "completed") {
  //   filtredTask = task.filter((t) => t.isDone === true);
  // }
  const deleteToDoList = (toDoListId: string) => {
    setToDoList(toDoList.filter((t) => t.id !== toDoListId));
    delete task[toDoListId];
  };

  const applicationToDoLists = toDoList.map((t) => {
    const getFiltredTaskForRender = (
      taskList: tasksType[],
      filterValue: filterType
    ) => {
      switch (filterValue) {
        case "active":
          return taskList.filter((t) => !t.isDone);
        case "completed":
          return taskList.filter((t) => t.isDone);

        default:
          return taskList;
      }
    };
    let filtredTask: Array<tasksType> = getFiltredTaskForRender(
      task[t.id],
      t.filter
    );
    const changeFilter = (status: filterType, toDoListId: string) => {
      setToDoList(
        toDoList.map((t) =>
          t.id === toDoListId ? { ...t, filter: status } : t
        )
      );
    };
    return (
      <ToDoList
        deleteToDoList={deleteToDoList}
        key={t.id}
        toDoListId={t.id}
        changeCeckboxStatus={changeCeckboxStatus}
        changeFilter={changeFilter}
        removeTask={removeTask}
        title={t.title}
        tasks={filtredTask}
        addTask={addTask}
        filter={t.filter}
      />
    );
  });

  return <div className="App">{applicationToDoLists}</div>;
}

export default App;
