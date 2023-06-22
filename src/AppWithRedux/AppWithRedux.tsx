import React, { ChangeEvent, useCallback, useReducer, useState } from "react";
import "./App.css";
import { ToDoList, filterType } from "../components/ToDoList";

import { AddItemForm } from "../components/AddItemForm/AddItemForm";
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

import { useAppWithRedux } from "./hooks/useAppWithRedux";
import { taskType } from "../api/todolist-api";

function AppWithRedux(): JSX.Element {
  const {
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
  } = useAppWithRedux();

  const applicationToDoLists = toDoList.map((t) => {
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
                  control={<Checkbox onChange={changeTheme} />}
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
