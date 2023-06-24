import { GetToDoLists } from "./../stories/todolists-api.stories";
import { filterType } from "./../components/ToDoList";
import React from "react";

import { v1 } from "uuid";
import { TodolistApi, toDoListType } from "../api/todolist-api";
import { Dispatch } from "redux";

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

export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
  TodolistApi.createToDoList(title).then(() => {
    dispatch(AddToDoListAC(title));
  });
};

export const ChangeHeadderTitleAC = (
  title: string,
  toDoListId: string
): ChangeHeadderTitleActionType => ({
  type: CHANGE_HEADDER_TITLE,
  title: title,
  toDoListId: toDoListId,
});

export const changeHeadderTitleTC =
  (title: string, toDoListId: string) => (dispatch: Dispatch) => {
    TodolistApi.updateToDoListTitle(toDoListId, title).then(() => {
      dispatch(ChangeHeadderTitleAC(title, toDoListId));
    });
  };

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

export const setTodoListTC = () => (dispatch: Dispatch) => {
  TodolistApi.getToDoLists().then((res) => {
    dispatch(setTodoListAC(res.data));
  });
};

export const deleteTodolistTC =
  (toDoListId: string) => (dispatch: Dispatch) => {
    TodolistApi.deleteToDoList(toDoListId).then(() => {
      dispatch(DeleteToDoListAC(toDoListId));
    });
  };

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
      return action.todoList.map((t) => ({
        ...t,
        filter: "all" as filterType,
      }));

    default:
      return state;
  }
};
