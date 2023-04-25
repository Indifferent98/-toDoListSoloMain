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
