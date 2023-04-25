import { filterType } from "./../components/ToDoList";
import React from "react";
import { toDolistType } from "../App";
import { v1 } from "uuid";

type ActionsType =
  | DeleteToDoListActionType
  | AddToDoListActionType
  | ChangeHeadderTitleActionType
  | changeFilterActionType;

type DeleteToDoListActionType = {
  type: "DELETE-TO-DO-LIST";
  toDoListId: string;
};

type AddToDoListActionType = {
  type: "ADD-NEW-TO-DO-LIST";
  title: string;
};

type ChangeHeadderTitleActionType = {
  title: string;
  toDoListId: string;
  type: "CHANGE-HEADDER-TITLE";
};

type changeFilterActionType = {
  filter: filterType;
  toDoListId: string;
  type: "CHANGE-FILTER";
};

export const toDoListReducer = (
  state: toDolistType[],
  action: ActionsType
): toDolistType[] => {
  switch (action.type) {
    case "DELETE-TO-DO-LIST":
      return state.filter((t) => t.id !== action.toDoListId);

    case "ADD-NEW-TO-DO-LIST":
      const newToDoListId = v1();
      const newToDoList: toDolistType = {
        id: newToDoListId,
        filter: "all",
        title: action.title,
      };
      return [...state, newToDoList];

    case "CHANGE-HEADDER-TITLE":
      return state.map((t) =>
        t.id === action.toDoListId ? { ...t, title: action.title } : t
      );

    case "CHANGE-FILTER":
      return state.map((t) =>
        t.id === action.toDoListId ? { ...t, filter: action.filter } : t
      );

    default:
      throw new Error("Bad action type");
  }

  return state;
};
