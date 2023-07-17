import { TaskStatuses, TodolistApi } from "./../../api/todolist-api";
import { createTheme } from "@mui/material";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useStateTaskType,
  removeTaskTC,
  addTaskTC,
  updateTaskStatusTC,
} from "../../Reducers/task-reducer";
import {
  ChangeFilterAC,
  todoListDomainType,
  setTodoListTC,
  deleteTodolistTC,
  addToDoListTC,
  changeHeadderTitleTC,
} from "../../Reducers/toDoList-reducer";
import { filterType } from "../../components/ToDoListWithReduxMain";
import { AppDispatchType, AppRootStateType } from "../../store/Store";

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
    (taskId: string, title: string, toDoListId: string) => {
      dispatch(updateTaskStatusTC(toDoListId, taskId, { title }));
    },
    [dispatch]
  );
  const changeCheckBoxStatus = useCallback(
    (taskId: string, taskIsDone: boolean, toDoListId: string) => {
      const newStatus = taskIsDone ? TaskStatuses.Completed : TaskStatuses.New;
      dispatch(updateTaskStatusTC(toDoListId, taskId, { status: newStatus }));
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
