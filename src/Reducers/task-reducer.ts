import React from "react";
import { useStateToDoListType } from "../App";
import { v1 } from "uuid";

type actionTypes =
  | removeTaskActionCreatorType
  | changeCheckBoxStatusActionCreatorType
  | addTaskActionCreatorType
  | changeTaskTitleActionCreatorType;

export const taskReducer = (
  state: useStateToDoListType,
  action: actionTypes
): useStateToDoListType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].filter(
          (t) => t.id !== action.taskId
        ),
      };

    case "CHANGE-CHECK-BOX-STATUS":
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.taskIsDone } : t
        ),
      };

    case "ADD-TASK":
      const newTitle = { id: v1(), title: action.title, isDone: false };

      return {
        ...state,
        [action.toDoListId]: [newTitle, ...state[action.toDoListId]],
      };

    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };

    default:
      return state;
  }
};

type removeTaskActionCreatorType = {
  type: "REMOVE-TASK";
  taskId: string;
  toDoListId: string;
};

export const removeTaskActionCreator = (
  taskId: string,
  toDoListId: string
): removeTaskActionCreatorType => ({
  type: "REMOVE-TASK",
  taskId,
  toDoListId,
});

type changeCheckBoxStatusActionCreatorType = {
  type: "CHANGE-CHECK-BOX-STATUS";
  taskId: string;
  taskIsDone: boolean;
  toDoListId: string;
};

export const changeCheckBoxStatusActionCreator = (
  taskId: string,
  taskIsDone: boolean,
  toDoListId: string
): changeCheckBoxStatusActionCreatorType => ({
  type: "CHANGE-CHECK-BOX-STATUS",
  taskId,
  taskIsDone,
  toDoListId,
});

type addTaskActionCreatorType = {
  type: "ADD-TASK";
  title: string;
  toDoListId: string;
};

export const addTaskActionCreator = (
  title: string,
  toDoListId: string
): addTaskActionCreatorType => ({
  type: "ADD-TASK",
  title,
  toDoListId,
});

type changeTaskTitleActionCreatorType = {
  type: "CHANGE-TASK-TITLE";
  id: string;
  title: string;
  toDoListId: string;
};

export const changeTaskTitleActionCreator = (
  id: string,
  title: string,
  toDoListId: string
): changeTaskTitleActionCreatorType => ({
  type: "CHANGE-TASK-TITLE",
  id,
  title,
  toDoListId,
});
