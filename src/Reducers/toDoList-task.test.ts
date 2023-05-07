import { taskReducer } from "./task-reducer";
import {
  AddToDoListAC,
  DeleteToDoListAC,
  toDoListReducer,
} from "./toDoList-reducer";
import { useStateToDoListType, toDolistType } from "../App";

test("To do List and task should be added and have same id", () => {
  const initialTasks: useStateToDoListType = {
    ["toDoListId_1"]: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Node", isDone: false },
      { id: "5", title: "Hooks", isDone: true },
      { id: "6", title: "State", isDone: false },
    ],
    ["toDoListId_2"]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "Beer", isDone: false },
      { id: "4", title: "Cucumber", isDone: false },
      { id: "5", title: "Salt", isDone: true },
      { id: "6", title: "Sugar", isDone: false },
    ],
  };

  const initialToDoLists: toDolistType[] = [
    {
      id: "toDoListId_1",
      filter: "all",
      title: "What to buy",
    },
    {
      filter: "all",
      id: "toDoListId_2",
      title: "What to learn",
    },
  ];

  const action = AddToDoListAC("What To Buy");

  const result1 = toDoListReducer(initialToDoLists, action);
  const result2 = taskReducer(initialTasks, action);
  const size = Object.keys(result2);

  const newKey = size.find((t) => t !== "toDoListId_1" && t !== "toDoListId_2");

  expect(result1.length).toBe(3);
  expect(size.length).toBe(3);
  expect(result1[2].id).toBe(newKey);
  if (newKey) {
    expect(result2[newKey]).toEqual([]);
  } else {
    throw new Error("newKey is undifined");
  }
});

test("To do List and task should be deleted", () => {
  const initialTasks: useStateToDoListType = {
    ["toDoListId_1"]: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Node", isDone: false },
      { id: "5", title: "Hooks", isDone: true },
      { id: "6", title: "State", isDone: false },
    ],
    ["toDoListId_2"]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "Beer", isDone: false },
      { id: "4", title: "Cucumber", isDone: false },
      { id: "5", title: "Salt", isDone: true },
      { id: "6", title: "Sugar", isDone: false },
    ],
  };

  const initialToDoLists: toDolistType[] = [
    {
      id: "toDoListId_1",
      filter: "all",
      title: "What to buy",
    },
    {
      filter: "all",
      id: "toDoListId_2",
      title: "What to learn",
    },
  ];

  const action = DeleteToDoListAC("toDoListId_2");

  const result1 = toDoListReducer(initialToDoLists, action);
  const result2 = taskReducer(initialTasks, action);
  const size = Object.keys(result2).length;
  expect(result1.length).toBe(1);
  expect(size).toBe(1);

  expect(result2[action.toDoListId]).toBeUndefined();
});
