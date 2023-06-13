import React from "react";
import { Provider } from "react-redux";
import { AppRootStateType, store } from "./Store";
import { toDolistType, useStateTaskType } from "../AppWithRedux/AppWithRedux";
import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "../Reducers/task-reducer";
import { toDoListReducer } from "../Reducers/toDoList-reducer";

export const TaskWithReduxProviderDecorator = (
  storyFn: () => React.ReactNode
) => {
  const rootReducer = combineReducers({
    task: taskReducer,
    toDoList: toDoListReducer,
  });
  const initialGlobalState = {
    task: {
      "123": [
        { id: "4444", title: "React", isDone: true },
        { id: "666", title: "Redux", isDone: false },
      ],
    },
    toDoList: [{ id: "123", filter: "all", title: "what to buy" }],
  };

  const storyBookStore = legacy_createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
  );

  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
