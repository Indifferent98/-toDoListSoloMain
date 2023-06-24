import { v1 } from "uuid";
import { taskReducer } from "./task-reducer";
import {
  AddToDoListAC,
  DeleteToDoListAC,
  toDoListReducer,
  todoListDomainType,
} from "./toDoList-reducer";
import { useStateTaskType } from "../App";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

test("To do List and task should be added and have same id", () => {
  const initialTasks: useStateTaskType = {
    ["toDoListId_1"]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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

  const initialToDoLists: todoListDomainType[] = [
    {
      id: "toDoListId_1",
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: "toDoListId_2",
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ];

  const action = AddToDoListAC("What To Buy", v1());

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
  const initialTasks: useStateTaskType = {
    ["toDoListId_1"]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.New,
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
        status: TaskStatuses.Completed,
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
        status: TaskStatuses.New,
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

  const initialToDoLists: todoListDomainType[] = [
    {
      id: "toDoListId_1",
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: "toDoListId_2",
      title: "What to learn",
      addedDate: "",
      order: 0,
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
