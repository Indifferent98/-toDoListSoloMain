import {
  ADD_NEW_TO_DO_LIST,
  AddToDoListAC,
  AddToDoListActionType,
  CHANGE_FILTER,
  CHANGE_HEADDER_TITLE,
  ChangeFilterAC,
  ChangeHeadderTitleAC,
  ChangeHeadderTitleActionType,
  DELETE_TO_DO_LIST,
  DeleteToDoListAC,
  DeleteToDoListActionType,
  changeFilterActionType,
  toDoListReducer,
  todoListDomainType,
} from "./toDoList-reducer";
import { v1 } from "uuid";
import React from "react";

test("DELETE TO DO LIST TEST", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: todoListDomainType[] = [
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ];

  const result = toDoListReducer(state, DeleteToDoListAC(toDoListId_2));

  expect(result.length).toBe(1);
  expect(state.length).toBe(2);
});

test("ADD-NEW-TO-DO-LIST test", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: todoListDomainType[] = [
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ];

  const result = toDoListReducer(state, AddToDoListAC("NEWW TITLE"));

  expect(result.length).toBe(3);
  expect(state.length).toBe(2);
  expect(result[2].title).toBe("NEWW TITLE");
  expect(result[1].title).toBe("What to learn");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
});

test(CHANGE_HEADDER_TITLE, () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: todoListDomainType[] = [
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ];

  const result = toDoListReducer(
    state,
    ChangeHeadderTitleAC("qqqq QQQQ", toDoListId_2)
  );

  expect(result.length).toBe(2);
  expect(state.length).toBe(2);
  expect(result[1].title).toBe("qqqq QQQQ");
  expect(result[0].title).toBe("What to buy");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
  expect(state[1].title).toBe("What to learn");
  expect(state[0].title).toBe("What to buy");
});

test(CHANGE_FILTER, () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: todoListDomainType[] = [
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ];
  const action: changeFilterActionType = {
    type: CHANGE_FILTER,

    toDoListId: toDoListId_2,
    filter: "completed",
  };
  const result = toDoListReducer(
    state,
    ChangeFilterAC("completed", toDoListId_2)
  );

  expect(result.length).toBe(2);
  expect(state.length).toBe(2);
  expect(result[1].filter).toBe("completed");
  expect(state[1].filter).toBe("all");
  expect(result[0].filter).toBe("all");
  expect(state[0].filter).toBe("all");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
});
