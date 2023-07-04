import {
  handleServerAppError,
  handleServerNetworkError,
} from "./../untils/errorUtils";
import {
  setAppErrorStatusAC,
  setAppErrorStatusACType,
  setLoadingStatusAC,
  setLoadingStatusACType,
} from "./app-reducer";
import { useDispatch } from "react-redux";
import {
  ModelTaskUpdateType,
  TodolistApi,
  taskType,
  toDoListType,
} from "./../api/todolist-api";
import {
  ADD_NEW_TO_DO_LIST,
  AddToDoListActionType,
  DELETE_TO_DO_LIST,
  DeleteToDoListActionType,
  ResultCode,
  SET_TODOLIST,
  setTodoListACType,
} from "./toDoList-reducer";
import React from "react";

import { v1 } from "uuid";

import { TaskPriorities, TaskStatuses } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../store/Store";

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
  item: taskType;
};
type changeTaskTitleActionCreatorType = {
  type: "CHANGE-TASK-TITLE";
  id: string;
  title: string;
  toDoListId: string;
};

type TaskActionTypes =
  | removeTaskActionCreatorType
  | changeCheckBoxStatusActionCreatorType
  | addTaskActionCreatorType
  | changeTaskTitleActionCreatorType
  | AddToDoListActionType
  | DeleteToDoListActionType
  | setTodoListACType
  | setTasksACType
  | updateTaskStatusACType
  | setLoadingStatusACType
  | setAppErrorStatusACType;

export const REMOVE_TASK = "REMOVE-TASK";
export const CHANGE_CHECK_BOX_STATUS = "CHANGE-CHECK-BOX-STATUS";
export const ADD_TASK = "ADD-TASK";
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";
export const SET_TASKS = "SET-TASKS";
const UPDATE_TASK_STATUS = "UPDATE-TASK-STATUS";
export type useStateTaskType = {
  [id: string]: taskType[];
};
const intialTask: useStateTaskType = {};

export const taskReducer = (
  state: useStateTaskType = intialTask,
  action: TaskActionTypes
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
      return {
        ...state,
        [action.toDoListId]: [action.item, ...state[action.item.todoListId]],
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
      const stateCopy = { ...state };
      action.todoList.forEach((t) => (stateCopy[t.id] = []));
      return stateCopy;

    case SET_TASKS:
      return { ...state, [action.toDoListId]: action.tasks };

    case UPDATE_TASK_STATUS:
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? action.task : t
        ),
      };

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
export const removeTaskTC =
  (toDoListId: string, taskId: string) =>
  (dispatch: Dispatch<TaskActionTypes>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.deleteTask(toDoListId, taskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(removeTaskActionCreator(taskId, toDoListId));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

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

export const changeCheckBoxStatusTC =
  (taskId: string, taskIsDone: boolean, toDoListId: string, title: string) =>
  (dispatch: Dispatch<TaskActionTypes>) => {
    dispatch(setLoadingStatusAC("loading"));
    const status = taskIsDone ? TaskStatuses.Completed : TaskStatuses.New;

    TodolistApi.changeCheckBoxStatus(toDoListId, taskId, status, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(
            changeCheckBoxStatusActionCreator(taskId, taskIsDone, toDoListId)
          );
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const addTaskActionCreator = (
  title: string,
  toDoListId: string,
  item: taskType
): addTaskActionCreatorType => ({
  type: ADD_TASK,
  title,
  toDoListId,
  item,
});

export const addTaskTC =
  (title: string, toDoListId: string) =>
  (dispatch: Dispatch<TaskActionTypes>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.createTask(toDoListId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(addTaskActionCreator(title, toDoListId, res.data.data.item));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

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

export const changeTaskTitleTC =
  (taskId: string, title: string, toDoListId: string) =>
  (dispatch: Dispatch<TaskActionTypes>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.changeTaskTitle(toDoListId, taskId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(changeTaskTitleActionCreator(taskId, title, toDoListId));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

type setTasksACType = {
  type: "SET-TASKS";
  tasks: taskType[];
  toDoListId: string;
};

export const setTasksAC = (
  tasks: taskType[],
  toDoListId: string
): setTasksACType => ({
  type: SET_TASKS,
  tasks,
  toDoListId,
});

export const setTasksTC =
  (todoListId: string) => (dispatch: Dispatch<TaskActionTypes>) => {
    dispatch(setLoadingStatusAC("loading"));
    TodolistApi.getTasks(todoListId)
      .then((res) => {
        if (!res.data.error) {
          dispatch(setTasksAC(res.data.items, todoListId));
          dispatch(setLoadingStatusAC("succeeded"));
        } else {
          dispatch(setLoadingStatusAC("failed"));
          dispatch(setAppErrorStatusAC(res.data.error));
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch);
      });
  };

type updateTaskStatusACType = ReturnType<typeof updateTaskStatusAC>;

export const updateTaskStatusAC = (
  todoListId: string,
  taskId: string,
  task: taskType
) =>
  ({
    type: "UPDATE-TASK-STATUS",
    todoListId,
    taskId,
    task,
  } as const);

export const updateTaskStatusTC =
  (todoListId: string, taskId: string, data: ModelTaskUpdateType) =>
  (dispatch: Dispatch<TaskActionTypes>, getState: () => AppRootStateType) => {
    dispatch(setLoadingStatusAC("loading"));

    const task = getState().task[todoListId].find((t) => t.id === taskId);

    if (task) {
      const model = {
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...data,
      };
      TodolistApi.changeTaskState(todoListId, taskId, model)
        .then((res) => {
          if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(
              updateTaskStatusAC(todoListId, taskId, { ...task, ...data })
            );
            dispatch(setLoadingStatusAC("succeeded"));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((err) => {
          handleServerNetworkError(err, dispatch);
        });
    }
  };
