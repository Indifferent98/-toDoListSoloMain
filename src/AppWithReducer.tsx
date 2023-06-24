import React, { ChangeEvent, useReducer, useState } from "react";
import "./App.css";
import { ToDoList, filterType } from "./components/ToDoList";
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
  toDoListReducer,
  todoListDomainType,
} from "./Reducers/toDoList-reducer";
import {
  addTaskActionCreator,
  changeCheckBoxStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
  taskReducer,
} from "./Reducers/task-reducer";
import { TaskPriorities, TaskStatuses, taskType } from "./api/todolist-api";

export type useStateTaskType = {
  [id: string]: taskType[];
};

function AppWithReducer(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();

  const [toDoList, dispatchToToDoList] = useReducer(toDoListReducer, [
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  ]);

  const [task, dispatchToTasks] = useReducer(taskReducer, {
    [toDoListId_1]: [
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "HTML",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "Node",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "Hooks",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "State",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_1,
      },
    ],
    [toDoListId_2]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Bread",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Beer",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Cucumber",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Salt",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Sugar",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId_2,
      },
    ],
  });

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

  const removeTask = (id: string, toDoListId: string) => {
    dispatchToTasks(removeTaskActionCreator(id, toDoListId));
  };

  const changeCheckBoxStatus = (
    taskId: string,
    taskIsDone: boolean,
    toDoListId: string
  ) => {
    dispatchToTasks(
      changeCheckBoxStatusActionCreator(taskId, taskIsDone, toDoListId)
    );
  };

  const addTask = (title: string, toDoListId: string) => {
    dispatchToTasks(
      addTaskActionCreator(title, toDoListId, {
        id: v1(),
        title: title,
        status: 0,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: toDoListId,
      })
    );
  };

  const deleteToDoList = (toDoListId: string) => {
    const action = DeleteToDoListAC(toDoListId);
    dispatchToTasks(action);
    dispatchToToDoList(action);
  };
  const addNewToDoList = (title: string) => {
    const action = AddToDoListAC(title);
    dispatchToToDoList(action);
    dispatchToTasks(action);
  };
  const changeTaskTitle = (id: string, title: string, toDoListId: string) => {
    dispatchToTasks(changeTaskTitleActionCreator(id, title, toDoListId));
  };
  const changeHeadderTitle = (title: string, toDoListId: string) => {
    dispatchToToDoList(ChangeHeadderTitleAC(title, toDoListId));
  };

  const applicationToDoLists = toDoList.map((t) => {
    const getFiltredTaskForRender = (
      taskList: taskType[],
      filterValue: filterType
    ) => {
      switch (filterValue) {
        case "active":
          return taskList.filter((t) => t.status === TaskStatuses.New);
        case "completed":
          return taskList.filter((t) => t.status === TaskStatuses.Completed);

        default:
          return taskList;
      }
    };
    let filtredTask: Array<taskType> = getFiltredTaskForRender(
      task[t.id],
      t.filter
    );
    const changeFilter = (status: filterType, toDoListId: string) => {
      dispatchToToDoList(ChangeFilterAC(status, toDoListId));
    };

    return (
      <Grid item>
        <Paper elevation={5}>
          <ToDoList
            deleteToDoList={deleteToDoList}
            key={t.id}
            toDoListId={t.id}
            changeCheckBoxStatus={changeCheckBoxStatus}
            changeFilter={changeFilter}
            removeTask={removeTask}
            title={t.title}
            tasks={filtredTask}
            addTask={addTask}
            filter={t.filter}
            changeTaskTitle={changeTaskTitle}
            changeHeadderTitle={changeHeadderTitle}
          />
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

export default AppWithReducer;
