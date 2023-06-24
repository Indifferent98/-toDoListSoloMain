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
  removeTaskTC,
  changeTaskTitleTC,
  changeCheckBoxStatusTC,
  addTaskTC,
} from "../../Reducers/task-reducer";
import {
  DeleteToDoListAC,
  AddToDoListAC,
  ChangeHeadderTitleAC,
  ChangeFilterAC,
  todoListDomainType,
  setTodoListTC,
  deleteTodolistTC,
  addToDoListTC,
  changeHeadderTitleTC,
} from "../../Reducers/toDoList-reducer";
import { filterType } from "../../components/ToDoListWithReduxMain";
import { AppDispatchType, AppRootStateType } from "../../store/Store";

import { toDoListType } from "../../api/todolist-api";

export const useAppWithRedux = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const toDoList = useSelector<AppRootStateType, todoListDomainType[]>(
    (state) => state.toDoList
  );

  const dispatch: AppDispatchType = useDispatch();

  const task = useSelector<AppRootStateType, useStateTaskType>(
    (state) => state.task,
    (prev, next) => prev === next
  );

  useEffect(() => {
    dispatch(setTodoListTC());
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
    (taskId: string, toDoListId: string) => {
      dispatch(removeTaskTC(toDoListId, taskId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (id: string, title: string, toDoListId: string) => {
      dispatch(changeTaskTitleTC(id, title, toDoListId));
    },
    [dispatch]
  );
  const changeCheckBoxStatus = useCallback(
    (
      taskId: string,
      taskIsDone: boolean,
      toDoListId: string,
      title: string
    ) => {
      dispatch(changeCheckBoxStatusTC(taskId, taskIsDone, toDoListId, title));
      debugger;
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, toDoListId: string) => {
      dispatch(addTaskTC(title, toDoListId));
    },
    [dispatch]
  );

  const deleteToDoList = useCallback(
    (toDoListId: string) => {
      dispatch(deleteTodolistTC(toDoListId));
    },
    [dispatch]
  );
  const addNewToDoList = useCallback(
    (title: string) => {
      dispatch(addToDoListTC(title));
    },
    [dispatch]
  );

  const changeHeadderTitle = useCallback(
    (title: string, toDoListId: string) => {
      dispatch(changeHeadderTitleTC(title, toDoListId));
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
