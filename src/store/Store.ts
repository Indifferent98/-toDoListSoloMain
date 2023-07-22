import { AuthReducer } from "./../features/Auth-reducer";
import { appReducer } from "../Reducers/app-reducer";
import { TodolistApi } from "./../api/todolist-api";
import { toDoListReducer } from "./../Reducers/toDoList-reducer";
import { setTasksAC, taskReducer } from "./../Reducers/task-reducer";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";

import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  task: taskReducer,
  toDoList: toDoListReducer,
  app: appReducer,
  auth: AuthReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

//@ts-ignore
window.store = store;
