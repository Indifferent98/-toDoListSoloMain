import { toDoListReducer } from "./../Reducers/toDoList-reducer";
import { taskReducer } from "./../Reducers/task-reducer";
import React from "react";
import { combineReducers, legacy_createStore } from "redux";

export const rootReducer = combineReducers({
  task: taskReducer,
  toDoList: toDoListReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer);
