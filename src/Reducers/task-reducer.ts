import React from "react";
import { useStateToDoListType } from "../App";

type actionTypes =
  | removeTaskActionCreatorType
  | changeCheckBoxStatusActionCreatorType;

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
