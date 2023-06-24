import { TodolistApi } from "./../api/todolist-api";
import { toDoListReducer } from "./../Reducers/toDoList-reducer";
import { setTasksAC, taskReducer } from "./../Reducers/task-reducer";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import {
  AnyAction,
  Dispatch,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import { taskType } from "../api/todolist-api";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  task: taskReducer,
  toDoList: toDoListReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

//@ts-ignore
window.store = store;
