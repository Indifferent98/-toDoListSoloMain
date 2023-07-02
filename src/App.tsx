import React, { ChangeEvent, useState } from "react";

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
import { TaskPriorities, TaskStatuses, taskType } from "./api/todolist-api";
import { todoListDomainType } from "./Reducers/toDoList-reducer";

export type useStateTaskType = {
  [id: string]: taskType[];
};

function App(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const toDoListId_1 = v1();
  const toDoListId_2 = v1();

  const [toDoList, setToDoList] = useState<todoListDomainType[]>([
    {
      id: toDoListId_1,
      filter: "all",
      title: "What to buy",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      filter: "all",
      id: toDoListId_2,
      title: "What to learn",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ]);
  const [task, setTask] = useState<useStateTaskType>({
    [toDoListId_1]: [
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "HTML",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_1,
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_1,
      },

      {
        id: v1(),
        title: "Hooks",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_1,
      },
    ],
    [toDoListId_2]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Bread",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Beer",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        todoListId: toDoListId_2,
      },
      {
        id: v1(),
        title: "Cucumber",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
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
        t.id === taskId
          ? {
              ...t,
              status: taskIsDone ? TaskStatuses.Completed : TaskStatuses.New,
            }
          : t
      ),
    });
  };
  const addTask = (title: string, toDoListId: string) => {
    const newTitle: taskType = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      addedDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      todoListId: toDoListId,
    };
    setTask({ ...task, [toDoListId]: [newTitle, ...task[toDoListId]] });
  };

  const deleteToDoList = (toDoListId: string) => {
    setToDoList(toDoList.filter((t) => t.id !== toDoListId));
    delete task[toDoListId];
  };

  const addNewToDoList = (title: string) => {
    const newToDoListId = v1();
    const newToDoList: todoListDomainType = {
      id: newToDoListId,
      filter: "all",
      title: title,
      addedDate: "",
      order: 0,
      entityStatus: "idle",
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
    // const getFiltredTaskForRender = (
    //   taskList: taskType[],
    //   filterValue: filterType
    // ) => {
    //   switch (filterValue) {
    //     case "active":
    //       return taskList.filter((t) => t.status === TaskStatuses.New);
    //     case "completed":
    //       return taskList.filter((t) => t.status === TaskStatuses.Completed);

    //     default:
    //       return taskList;
    //   }
    // };
    // let filtredTask: Array<taskType> = getFiltredTaskForRender(
    //   task[t.id],
    //   t.filter
    // );
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
            tasks={task[t.id]}
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
