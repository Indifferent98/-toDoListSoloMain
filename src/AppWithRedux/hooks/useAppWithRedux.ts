import { TodolistApi } from "./../../api/todolist-api";
import { createTheme } from "@mui/material";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTaskActionCreator,
  changeTaskTitleActionCreator,
  changeCheckBoxStatusActionCreator,
  addTaskActionCreator,
  useStateTaskType,
} from "../../Reducers/task-reducer";
import {
  DeleteToDoListAC,
  AddToDoListAC,
  ChangeHeadderTitleAC,
  ChangeFilterAC,
  todoListDomainType,
  setTodoListAC,
} from "../../Reducers/toDoList-reducer";
import { filterType } from "../../components/ToDoListWithReduxMain";
import { AppRootStateType } from "../../store/Store";

import { toDoListType } from "../../api/todolist-api";

export const useAppWithRedux = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const toDoList = useSelector<AppRootStateType, todoListDomainType[]>(
    (state) => state.toDoList
  );

  const dispatch = useDispatch();

  const task = useSelector<AppRootStateType, useStateTaskType>(
    (state) => state.task,
    (prev, next) => prev === next
  );
  useEffect(() => {
    TodolistApi.getToDoLists().then((res) => {
      debugger;
      dispatch(setTodoListAC(res.data));
    });
  }, []);

  const themeMode = isDarkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(10, 115, 144)",
      },
      secondary: {
        main: "rgb(208, 86, 86)",
      },
      //mode theme
      mode: themeMode,
    },
  });

  const removeTask = useCallback(
    (id: string, toDoListId: string) => {
      dispatch(removeTaskActionCreator(id, toDoListId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (id: string, title: string, toDoListId: string) => {
      dispatch(changeTaskTitleActionCreator(id, title, toDoListId));
    },
    [dispatch]
  );
  const changeCheckBoxStatus = useCallback(
    (taskId: string, taskIsDone: boolean, toDoListId: string) => {
      dispatch(
        changeCheckBoxStatusActionCreator(taskId, taskIsDone, toDoListId)
      );
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, toDoListId: string) => {
      dispatch(addTaskActionCreator(title, toDoListId));
    },
    [dispatch]
  );

  const deleteToDoList = useCallback(
    (toDoListId: string) => {
      dispatch(DeleteToDoListAC(toDoListId));
    },
    [dispatch]
  );
  const addNewToDoList = useCallback(
    (title: string) => {
      dispatch(AddToDoListAC(title));
    },
    [dispatch]
  );

  const changeHeadderTitle = useCallback(
    (title: string, toDoListId: string) => {
      dispatch(ChangeHeadderTitleAC(title, toDoListId));
    },
    [dispatch]
  );
  const changeFilter = useCallback(
    (status: filterType, toDoListId: string) => {
      dispatch(ChangeFilterAC(status, toDoListId));
    },
    [dispatch]
  );

  const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.currentTarget.checked);
  };

  return {
    deleteToDoList,
    changeCheckBoxStatus,
    changeFilter,
    removeTask,
    task,
    addTask,
    changeTaskTitle,
    changeHeadderTitle,
    toDoList,
    theme,
    isDarkMode,
    addNewToDoList,

    changeTheme,
  };
};
