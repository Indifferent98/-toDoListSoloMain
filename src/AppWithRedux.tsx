import React, { ChangeEvent, useCallback, useReducer, useState } from "react";
import "./App.css";
import { ToDoList, filterType, tasksType } from "./components/ToDoList";
import { v1 } from "uuid";

import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { Menu } from "@mui/icons-material";
import {
  AddToDoListAC,
  ChangeFilterAC,
  ChangeHeadderTitleAC,
  DeleteToDoListAC,
} from "./Reducers/toDoList-reducer";
import {
  addTaskActionCreator,
  changeCheckBoxStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
} from "./Reducers/task-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store/Store";
import { ToDoListWithRedux } from "./components/ToDoListWithReduxMain";

export type toDolistType = {
  id: string;

  title: string;
  filter: filterType;
};

export type useStateTaskType = {
  [id: string]: tasksType[];
};

function AppWithRedux(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const toDoList = useSelector<AppRootStateType, toDolistType[]>(
    (state) => state.toDoList
  );

  const dispatch = useDispatch();

  const task = useSelector<AppRootStateType, useStateTaskType>(
    (state) => state.task,
    (prev, next) => prev === next
  );

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
  const applicationToDoLists = toDoList.map((t) => {
    // const getFiltredTaskForRender = (
    //   taskList: tasksType[],
    //   filterValue: filterType
    // ) => {
    //   switch (filterValue) {
    //     case "active":
    //       return taskList.filter((t) => !t.isDone);
    //     case "completed":
    //       return taskList.filter((t) => t.isDone);

    //     default:
    //       return taskList;
    //   }
    // };
    // let filtredTask: Array<tasksType> = getFiltredTaskForRender(
    //   task[t.id],
    //   t.filter
    // );

    return (
      <Grid key={t.id} item>
        <Paper elevation={5}>
          <ToDoList
            deleteToDoList={deleteToDoList}
            key={t.id}
            toDoListId={t.id}
            changeCheckBoxStatus={changeCheckBoxStatus}
            changeFilter={changeFilter}
            removeTask={removeTask}
            title={t.title}
            tasks={task[t.id]}
            addTask={addTask}
            filter={t.filter}
            changeTaskTitle={changeTaskTitle}
            changeHeadderTitle={changeHeadderTitle}
          />

          {/* <ToDoListWithRedux toDoList={toDoList[i]} /> */}
        </Paper>
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      {/* сброс css стилей */}
      <CssBaseline>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                ToDoLists
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => setDarkMode(e.currentTarget.checked)}
                    />
                  }
                  label={isDarkMode ? "Dark mode" : "Light mode"}
                />
              </FormGroup>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Container fixed>
            <Grid container sx={{ p: "15px 0" }}>
              <AddItemForm addItem={addNewToDoList} />
            </Grid>
            <Grid container spacing={4}>
              {applicationToDoLists}
            </Grid>
          </Container>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default AppWithRedux;
