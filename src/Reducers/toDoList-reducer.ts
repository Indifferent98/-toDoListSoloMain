import { filterType } from "./../components/ToDoList";
import React from "react";

import { v1 } from "uuid";
import { toDoListType } from "../api/todolist-api";

type ActionsType =
  | DeleteToDoListActionType
  | AddToDoListActionType
  | ChangeHeadderTitleActionType
  | changeFilterActionType
  | setTodoListACType;

export const DELETE_TO_DO_LIST = "DELETE-TO-DO-LIST";
export const ADD_NEW_TO_DO_LIST = "ADD-NEW-TO-DO-LIST";
export const CHANGE_HEADDER_TITLE = "CHANGE-HEADDER-TITLE";
export const CHANGE_FILTER = "CHANGE-FILTER";
export const SET_TODOLIST = "SET-TODOLIST";
export const DeleteToDoListAC = (
  toDoListId: string
): DeleteToDoListActionType => ({
  type: DELETE_TO_DO_LIST,
  toDoListId,
});

export const AddToDoListAC = (title: string): AddToDoListActionType => ({
  type: ADD_NEW_TO_DO_LIST,
  title: title,
  toDoListId: v1(),
});

export const ChangeHeadderTitleAC = (
  title: string,
  toDoListId: string
): ChangeHeadderTitleActionType => ({
  type: CHANGE_HEADDER_TITLE,
  title: title,
  toDoListId: toDoListId,
});

export const ChangeFilterAC = (
  filter: filterType,
  toDoListId: string
): changeFilterActionType => ({
  type: CHANGE_FILTER,
  filter,
  toDoListId,
});

export type DeleteToDoListActionType = {
  type: "DELETE-TO-DO-LIST";
  toDoListId: string;
};

export type AddToDoListActionType = {
  type: "ADD-NEW-TO-DO-LIST";
  title: string;
  toDoListId: string;
};

export type ChangeHeadderTitleActionType = {
  title: string;
  toDoListId: string;
  type: "CHANGE-HEADDER-TITLE";
};

export type changeFilterActionType = {
  filter: filterType;
  toDoListId: string;
  type: "CHANGE-FILTER";
};

export type setTodoListACType = {
  type: "SET-TODOLIST";
  todoList: toDoListType[];
};
export const setTodoListAC = (todoList: toDoListType[]): setTodoListACType => ({
  type: SET_TODOLIST,
  todoList,
});

export type todoListDomainType = toDoListType & { filter: filterType };
const intialToDoList: todoListDomainType[] = [];

export const toDoListReducer = (
  state: todoListDomainType[] = intialToDoList,
  action: ActionsType
): todoListDomainType[] => {
  switch (action.type) {
    case DELETE_TO_DO_LIST:
      return state.filter((t) => t.id !== action.toDoListId);

    case ADD_NEW_TO_DO_LIST:
      const newToDoList: todoListDomainType = {
        id: action.toDoListId,
        filter: "all",
        title: action.title,
        addedDate: "",
        order: 0,
      };
      return [...state, newToDoList];

    case CHANGE_HEADDER_TITLE:
      return state.map((t) =>
        t.id === action.toDoListId ? { ...t, title: action.title } : t
      );

    case CHANGE_FILTER:
      return state.map((t) =>
        t.id === action.toDoListId ? { ...t, filter: action.filter } : t
      );

    case SET_TODOLIST:
      debugger;

      const newLists: todoListDomainType[] = [
        ...action.todoList.map((t) => ({ ...t, filter: "all" as filterType })),
      ];
      return newLists;

    default:
      return state;
  }
};
