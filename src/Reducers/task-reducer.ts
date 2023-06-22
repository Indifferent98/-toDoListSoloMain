import {
  ADD_NEW_TO_DO_LIST,
  AddToDoListActionType,
  DELETE_TO_DO_LIST,
  DeleteToDoListActionType,
  SET_TODOLIST,
  setTodoListACType,
} from "./toDoList-reducer";
import React from "react";

import { v1 } from "uuid";

import { TaskPriorities, TaskStatuses, taskType } from "../api/todolist-api";

type removeTaskActionCreatorType = {
  type: "REMOVE-TASK";
  taskId: string;
  toDoListId: string;
};
type changeCheckBoxStatusActionCreatorType = {
  type: "CHANGE-CHECK-BOX-STATUS";
  taskId: string;
  taskIsDone: boolean;
  toDoListId: string;
};
type addTaskActionCreatorType = {
  type: "ADD-TASK";
  title: string;
  toDoListId: string;
};
type changeTaskTitleActionCreatorType = {
  type: "CHANGE-TASK-TITLE";
  id: string;
  title: string;
  toDoListId: string;
};

type actionTypes =
  | removeTaskActionCreatorType
  | changeCheckBoxStatusActionCreatorType
  | addTaskActionCreatorType
  | changeTaskTitleActionCreatorType
  | AddToDoListActionType
  | DeleteToDoListActionType
  | setTodoListACType;

export const REMOVE_TASK = "REMOVE-TASK";
export const CHANGE_CHECK_BOX_STATUS = "CHANGE-CHECK-BOX-STATUS";
export const ADD_TASK = "ADD-TASK";
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";
export type useStateTaskType = {
  [id: string]: taskType[];
};
const intialTask: useStateTaskType = {};

export const taskReducer = (
  state: useStateTaskType = intialTask,
  action: actionTypes
): useStateTaskType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].filter(
          (t) => t.id !== action.taskId
        ),
      };

    case CHANGE_CHECK_BOX_STATUS:
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                status: action.taskIsDone
                  ? TaskStatuses.Completed
                  : TaskStatuses.New,
              }
            : t
        ),
      };

    case ADD_TASK:
      const newTitle: taskType = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: action.toDoListId,
      };

      return {
        ...state,
        [action.toDoListId]: [newTitle, ...state[action.toDoListId]],
      };

    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };

    case ADD_NEW_TO_DO_LIST:
      return { ...state, [action.toDoListId]: [] };

    case DELETE_TO_DO_LIST:
      delete state[action.toDoListId];
      return state;

    case SET_TODOLIST:
      action.todoList.forEach((t) => (state[t.id] = []));
      return state;

    default:
      return state;
  }
};

export const removeTaskActionCreator = (
  taskId: string,
  toDoListId: string
): removeTaskActionCreatorType => ({
  type: REMOVE_TASK,
  taskId,
  toDoListId,
});

export const changeCheckBoxStatusActionCreator = (
  taskId: string,
  taskIsDone: boolean,
  toDoListId: string
): changeCheckBoxStatusActionCreatorType => ({
  type: CHANGE_CHECK_BOX_STATUS,
  taskId,
  taskIsDone,
  toDoListId,
});

export const addTaskActionCreator = (
  title: string,
  toDoListId: string
): addTaskActionCreatorType => ({
  type: ADD_TASK,
  title,
  toDoListId,
});

export const changeTaskTitleActionCreator = (
  id: string,
  title: string,
  toDoListId: string
): changeTaskTitleActionCreatorType => ({
  type: CHANGE_TASK_TITLE,
  id,
  title,
  toDoListId,
});
