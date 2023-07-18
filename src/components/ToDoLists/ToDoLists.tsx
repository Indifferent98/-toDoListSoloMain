import Grid from "@mui/material/Grid";
import React from "react";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { ToDoList } from "./Todolist/ToDoList";
import { useAppWithRedux } from "../../AppWithRedux/hooks/useAppWithRedux";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/Store";
import { Navigate } from "react-router-dom";

export const Todolists = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

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
    addNewToDoList,
  } = useAppWithRedux();
  if (!isLoggedIn) {
    return <Navigate to={"/Login"} />;
  }
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
            entityStatus={t.entityStatus}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addNewToDoList} />
      </Grid>
      <Grid container spacing={4}>
        {applicationToDoLists}
      </Grid>
    </>
  );
};
