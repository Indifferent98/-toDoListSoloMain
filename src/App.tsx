import React, { ChangeEvent, useState } from "react";
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
export type toDolistType = {
  id: string;

  title: string;
  filter: filterType;
};
type tasksType = {
  id: string;
  isDone: boolean;
  title: string;
};

export type useStateTaskType = {
  [id: string]: tasksType[];
};

function App(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();

  const [toDoList, setToDoList] = useState<toDolistType[]>([
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
    },
  ]);
  const [task, setTask] = useState<useStateTaskType>({
    [toDoListId_1]: [
      { id: v1(), title: "CSS", isDone: false },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Node", isDone: false },
      { id: v1(), title: "Hooks", isDone: true },
      { id: v1(), title: "State", isDone: false },
    ],
    [toDoListId_2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Beer", isDone: false },
      { id: v1(), title: "Cucumber", isDone: false },
      { id: v1(), title: "Salt", isDone: true },
      { id: v1(), title: "Sugar", isDone: false },
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
    setTask({
      ...task,
      [toDoListId]: task[toDoListId].filter((t) => t.id !== id),
    });
  };
  const changeCheckBoxStatus = (
    taskId: string,
    taskIsDone: boolean,
    toDoListId: string
  ) => {
    setTask({
      ...task,
      [toDoListId]: task[toDoListId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskIsDone } : t
      ),
    });
  };
  const addTask = (title: string, toDoListId: string) => {
    const newTitle = { id: v1(), title: title, isDone: false };
    setTask({ ...task, [toDoListId]: [newTitle, ...task[toDoListId]] });
  };

  const deleteToDoList = (toDoListId: string) => {
    setToDoList(toDoList.filter((t) => t.id !== toDoListId));
    delete task[toDoListId];
  };
  const addNewToDoList = (title: string) => {
    const newToDoListId = v1();
    const newToDoList: toDolistType = {
      id: newToDoListId,
      filter: "all",
      title: title,
    };
    setToDoList([...toDoList, newToDoList]);

    setTask({ ...task, [newToDoListId]: [] });
  };
  const changeTaskTitle = (id: string, title: string, toDoListId: string) => {
    setTask({
      ...task,
      [toDoListId]: task[toDoListId].map((t) =>
        t.id === id ? { ...t, title: title } : t
      ),
    });
  };
  const changeHeadderTitle = (title: string, toDoListId: string) => {
    setToDoList(
      toDoList.map((t) => (t.id === toDoListId ? { ...t, title: title } : t))
    );
  };

  const applicationToDoLists = toDoList.map((t) => {
    const getFiltredTaskForRender = (
      taskList: tasksType[],
      filterValue: filterType
    ) => {
      switch (filterValue) {
        case "active":
          return taskList.filter((t) => !t.isDone);
        case "completed":
          return taskList.filter((t) => t.isDone);

        default:
          return taskList;
      }
    };
    let filtredTask: Array<tasksType> = getFiltredTaskForRender(
      task[t.id],
      t.filter
    );
    const changeFilter = (status: filterType, toDoListId: string) => {
      setToDoList(
        toDoList.map((t) =>
          t.id === toDoListId ? { ...t, filter: status } : t
        )
      );
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

export default App;
