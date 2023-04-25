import { toDoListReducer } from "./toDoList-reducer";
import { v1 } from "uuid";
import React from "react";
import { toDolistType } from "../App";

test("DELETE TO DO LIST TEST", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: toDolistType[] = [
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
  ];

  const result = toDoListReducer(state, {
    type: "DELETE-TO-DO-LIST",
    toDoListId: toDoListId_2,
  });

  expect(result.length).toBe(1);
  expect(state.length).toBe(2);
});

test("ADD-NEW-TO-DO-LIST test", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: toDolistType[] = [
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
  ];

  const result = toDoListReducer(state, {
    type: "ADD-NEW-TO-DO-LIST",
    title: "NEWW TITLE",
  });

  expect(result.length).toBe(3);
  expect(state.length).toBe(2);
  expect(result[2].title).toBe("NEWW TITLE");
  expect(result[1].title).toBe("What to learn");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
});

test("CHANGE-HEADDER-TITLE", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: toDolistType[] = [
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
  ];

  const result = toDoListReducer(state, {
    type: "CHANGE-HEADDER-TITLE",
    title: "qqqq QQQQ",
    toDoListId: toDoListId_2,
  });

  expect(result.length).toBe(2);
  expect(state.length).toBe(2);
  expect(result[1].title).toBe("qqqq QQQQ");
  expect(result[0].title).toBe("What to buy");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
  expect(state[1].title).toBe("What to learn");
  expect(state[0].title).toBe("What to buy");
});

test("CHANGE-FILTER", () => {
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();
  const state: toDolistType[] = [
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
  ];

  const result = toDoListReducer(state, {
    type: "CHANGE-FILTER",

    toDoListId: toDoListId_2,
    filter: "completed",
  });

  expect(result.length).toBe(2);
  expect(state.length).toBe(2);
  expect(result[1].filter).toBe("completed");
  expect(state[1].filter).toBe("all");
  expect(result[0].filter).toBe("all");
  expect(state[0].filter).toBe("all");
  expect(state).not.toBe(result);
  expect(state).not.toEqual(result);
});
