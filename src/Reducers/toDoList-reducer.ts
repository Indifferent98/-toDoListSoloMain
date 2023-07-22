import { handleServerAppError } from "./../untils/errorUtils";
import {
  RequestStatusType,
  setAppErrorStatusAC,
  setAppErrorStatusACType,
  setLoadingStatusAC,
  setLoadingStatusACType,
} from "./app-reducer";

import { filterType } from "../components/ToDoLists/Todolist/ToDoList";
import React from "react";

import { TodolistApi, toDoListType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { handleServerNetworkError } from "../untils/errorUtils";
import { AxiosError } from "axios";

type ToDoListActionsType =
  | DeleteToDoListActionType
  | AddToDoListActionType
  | ChangeHeadderTitleActionType
  | changeFilterActionType
  | setTodoListACType
  | setLoadingStatusACType
  | setAppErrorStatusACType
  | changeTodolistEntityStatusACType;

export const DELETE_TO_DO_LIST = "DELETE-TO-DO-LIST";
export const ADD_NEW_TO_DO_LIST = "ADD-NEW-TO-DO-LIST";
export const CHANGE_HEADDER_TITLE = "CHANGE-HEADDER-TITLE";
export const CHANGE_FILTER = "CHANGE-FILTER";
export const SET_TODOLIST = "SET-TODOLIST";
export const TODOLIST_CHANGE_TODOLIST_ENTITY_STATUS =
  "TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS";
export const DeleteToDoListAC = (
  toDoListId: string
): DeleteToDoListActionType => ({
  type: DELETE_TO_DO_LIST,
  toDoListId,
});

export const AddToDoListAC = (
  title: string,
  toDoListId: string
): AddToDoListActionType => ({
  type: ADD_NEW_TO_DO_LIST,
  title: title,
  toDoListId,
});

export const addToDoListTC =
  (title: string) => (dispatch: Dispatch<ToDoListActionsType>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.createToDoList(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(AddToDoListAC(title, res.data.data.item.id));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError<{ item: toDoListType }>(res.data, dispatch);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch);
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
  (title: string, toDoListId: string) =>
  (dispatch: Dispatch<ToDoListActionsType>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.updateToDoListTitle(toDoListId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(ChangeHeadderTitleAC(title, toDoListId));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
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

export enum ResultCode {
  SUCCESS = 0,
  ERROR = 1,
  ERROR_CAPTHCA = 10,
}

export const setTodoListTC =
  () => (dispatch: Dispatch<ToDoListActionsType>) => {
    TodolistApi.getToDoLists()
      .then((res) => {
        if (res.data) {
          dispatch(setTodoListAC(res.data));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          dispatch(setLoadingStatusAC("failed"));
          dispatch(setAppErrorStatusAC("some error was occured"));
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export type todoListDomainType = toDoListType & {
  filter: filterType;
  entityStatus: RequestStatusType;
};
const intialToDoList: todoListDomainType[] = [];

type changeTodolistEntityStatusACType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
export const changeTodolistEntityStatusAC = (
  status: RequestStatusType,
  todolistId: string
) =>
  ({
    type: "TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS",
    todolistId,
    status,
  } as const);

export const deleteTodolistTC =
  (toDoListId: string) => (dispatch: Dispatch<ToDoListActionsType>) => {
    dispatch(changeTodolistEntityStatusAC("loading", toDoListId));
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.deleteToDoList(toDoListId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(DeleteToDoListAC(toDoListId));
          dispatch(setLoadingStatusAC("succeeded"));
          dispatch(changeTodolistEntityStatusAC("idle", toDoListId));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
        dispatch(changeTodolistEntityStatusAC("failed", toDoListId));
      });
  };

export const toDoListReducer = (
  state: todoListDomainType[] = intialToDoList,
  action: ToDoListActionsType
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
        entityStatus: "idle",
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
        entityStatus: "idle" as RequestStatusType,
      }));

    case TODOLIST_CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map((t) =>
        t.id === action.todolistId ? { ...t, entityStatus: action.status } : t
      );

    default:
      return state;
  }
};
