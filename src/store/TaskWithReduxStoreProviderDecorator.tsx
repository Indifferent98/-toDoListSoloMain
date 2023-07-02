import React from "react";
import { Provider } from "react-redux";
import { AppRootStateType, store } from "./Store";

import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "../Reducers/task-reducer";
import { toDoListReducer } from "../Reducers/toDoList-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

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
        {
          id: "4444",
          title: "React",
          status: TaskStatuses.Completed,
          addedDate: "",
          deadline: "",
          description: "",
          order: 0,
          priority: TaskPriorities.Low,
          startDate: "",
          todoListId: "123",
        },
        {
          id: "666",
          title: "Redux",
          status: TaskStatuses.New,
          addedDate: "",
          deadline: "",
          description: "",
          order: 0,
          priority: TaskPriorities.Low,
          startDate: "",
          todoListId: "123",
        },
      ],
      "333": [
        {
          title: "Salt",
          id: "32423",
          status: TaskStatuses.Completed,
          addedDate: "",
          deadline: "",
          description: "",
          order: 0,
          priority: TaskPriorities.Low,
          startDate: "",
          todoListId: "333",
        },
        {
          title: "Water",
          id: "ergdf",
          status: TaskStatuses.New,
          addedDate: "",
          deadline: "",
          description: "",
          order: 0,
          priority: TaskPriorities.Low,
          startDate: "",
          todoListId: "333",
        },
      ],
    },
    toDoList: [
      {
        id: "123",
        filter: "all",
        title: "what to buy",
        addedDate: "",
        order: 0,
      },
    ],
    app: {
      status: "idle",
    },
  };

  const storyBookStore = legacy_createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
  );

  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
