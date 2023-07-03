import React from "react";

import {
  addTaskActionCreator,
  changeCheckBoxStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
  taskReducer,
  updateTaskStatusAC,
  useStateTaskType,
} from "./task-reducer";
import { TaskPriorities } from "../api/todolist-api";

const initialTasks: useStateTaskType = {
  ["toDoListId_1"]: [
    {
      id: "1",
      title: "CSS",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
    {
      id: "2",
      title: "HTML",
      status: 2,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
    {
      id: "3",
      title: "React",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
    {
      id: "4",
      title: "Node",
      status: 2,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
    {
      id: "5",
      title: "Hooks",
      status: 2,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
    {
      id: "6",
      title: "State",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_1",
    },
  ],
  ["toDoListId_2"]: [
    {
      id: "1",
      title: "Milk",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
    {
      id: "2",
      title: "Bread",
      status: 2,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
    {
      id: "3",
      title: "Beer",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
    {
      id: "4",
      title: "Cucumber",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
    {
      id: "5",
      title: "Salt",
      status: 2,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
    {
      id: "6",
      title: "Sugar",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    },
  ],
};

test("Task should be removed", () => {
  const result = taskReducer(
    initialTasks,
    removeTaskActionCreator("4", "toDoListId_2")
  );

  expect(result["toDoListId_2"].length).toBe(5);
  expect(result["toDoListId_1"].length).toBe(6);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
  expect(initialTasks["toDoListId_1"].length).toBe(6);
  expect(result["toDoListId_2"][3].id).toBe("5");
});

test("CheckBoxStatus should be changed", () => {
  const result = taskReducer(
    initialTasks,
    changeCheckBoxStatusActionCreator("2", false, "toDoListId_2")
  );

  expect(result["toDoListId_2"][1].status).toBe(0);
  expect(initialTasks["toDoListId_2"][1].status).toBe(2);
  expect(result["toDoListId_2"].length).toBe(6);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
});

test("Task  should be added", () => {
  const result = taskReducer(
    initialTasks,
    addTaskActionCreator("new title string", "toDoListId_2", {
      id: "toDoListId_2",
      title: "new title string",
      status: 0,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: TaskPriorities.Low,
      startDate: "",
      todoListId: "toDoListId_2",
    })
  );

  expect(result["toDoListId_2"].length).toBe(7);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
  expect(result["toDoListId_1"].length).toBe(6);
  expect(initialTasks["toDoListId_1"].length).toBe(6);
  expect(result["toDoListId_2"][0].title).toBe("new title string");
  expect(result["toDoListId_2"][0].id).toBeDefined();
});

test("Task title should be changed", () => {
  const result = taskReducer(
    initialTasks,
    changeTaskTitleActionCreator("4", "hello", "toDoListId_2")
  );

  expect(result["toDoListId_2"][3].title).toBe("hello");
  expect(initialTasks["toDoListId_2"][3].title).toBe("Cucumber");
});

test("any Task status should be changed", () => {
  const task = {
    id: "9988",
    title: "test-task",
    status: 2,
    addedDate: "",
    deadline: "",
    description: "",
    order: 3,
    priority: TaskPriorities.High,
    startDate: "",
    todoListId: "toDoListId_2",
  };

  const result = taskReducer(
    initialTasks,
    updateTaskStatusAC("toDoListId_2", "3", task)
  );

  expect(result["toDoListId_2"][2]).toEqual(task);

  expect(initialTasks["toDoListId_2"][2]).toEqual({
    id: "3",
    title: "Beer",
    status: 0,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "toDoListId_2",
  });

  expect(initialTasks["toDoListId_2"][3]).toEqual({
    id: "4",
    title: "Cucumber",
    status: 0,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "toDoListId_2",
  });
  expect(initialTasks["toDoListId_1"][2]).toEqual({
    id: "3",
    title: "React",
    status: 0,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "toDoListId_1",
  });
});
