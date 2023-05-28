import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";
import s from "./ToDoList.module.css";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditableSpan";
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { Task } from "./task/Task";

export type tasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  toDoListId: string;
  title: string;
  tasks: Array<tasksType>;
  removeTask: (id: string, toDoListId: string) => void;
  changeFilter: (status: filterType, toDoListId: string) => void;
  addTask: (title: string, toDoListId: string) => void;
  changeCheckBoxStatus: (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => void;
  filter: filterType;
  deleteToDoList: (toDoListId: string) => void;
  changeTaskTitle: (id: string, title: string, toDoListId: string) => void;
  changeHeadderTitle: (title: string, toDoListId: string) => void;
};

const ToDoList = React.memo((props: DoToListPropType): JSX.Element => {
  console.log("todolist is called");
  let styleForDoTolist = "ToDoList1";
  let tasks = props.tasks;
  if (props.filter === "active") {
    tasks = props.tasks.filter((t) => !t.isDone);
  }
  if (props.filter === "completed") {
    tasks = props.tasks.filter((t) => t.isDone);
  }

  const addTaskButtonHandler = useCallback(
    (title: string): void => {
      props.addTask(title, props.toDoListId);
    },
    [props.addTask, props.toDoListId]
  );
  const buttonFilterStyle = {
    marginLeft: "4px",
    borderRadius: "8px",
    border: "1px solid white",
  };

  const onClickAllHandler = (): void => {
    props.changeFilter("all", props.toDoListId);
  };
  const onClickActiveHandler = (): void => {
    props.changeFilter("active", props.toDoListId);
  };
  const onClickCompletedHandler = (): void => {
    props.changeFilter("completed", props.toDoListId);
  };
  const deleteToDoListHandler = () => {
    props.deleteToDoList(props.toDoListId);
  };
  const changeHeadderTitle = useCallback(
    (title: string) => {
      props.changeHeadderTitle(title, props.toDoListId);
    },
    [props.toDoListId, props.changeHeadderTitle]
  );

  const changeTaskTitle = useCallback(
    (title: string, id: string) => {
      props.changeTaskTitle(id, title, props.toDoListId);
    },
    [props.toDoListId]
  );

  const removeButtonHandler = useCallback(
    (id: string) => {
      props.removeTask(id, props.toDoListId);
    },
    [props.removeTask, props.toDoListId]
  );

  const changeCheckBoxStatus = useCallback(
    (id: string, checked: boolean) => {
      props.changeCheckBoxStatus(id, checked, props.toDoListId);
    },
    [props.changeCheckBoxStatus, props.toDoListId]
  );

  return (
    <div className={styleForDoTolist}>
      <Typography
        fontWeight={700}
        sx={{ marginBottom: "15px" }}
        align="center"
        variant="h5"
      >
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <EditableSpan addItem={changeHeadderTitle} title={props.title} />
          <Button
            variant="contained"
            size="small"
            sx={{ marginLeft: "10px" }}
            onClick={deleteToDoListHandler}
          >
            del <DeleteForeverIcon />
          </Button>
        </div>
      </Typography>
      <AddItemForm addItem={addTaskButtonHandler} />

      <List>
        {tasks.map((t) => {
          return (
            <Task
              key={t.id}
              id={t.id}
              isDone={t.isDone}
              removeButtonHandler={removeButtonHandler}
              changeCheckBoxStatus={changeCheckBoxStatus}
              changeTaskTitle={changeTaskTitle}
              title={t.title}
            />
          );
        })}
      </List>
      <div className={s.item}>
        <Button
          disableElevation
          variant="contained"
          size="small"
          style={buttonFilterStyle}
          color={props.filter === "all" ? "secondary" : "primary"}
          onClick={onClickAllHandler}
        >
          All
        </Button>
        <Button
          size="small"
          disableElevation
          style={buttonFilterStyle}
          color={props.filter === "active" ? "secondary" : "primary"}
          // className={props.filter === "active" ? s.buttonStyleActivity : ""}
          onClick={onClickActiveHandler}
          variant="contained"
        >
          Active
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          style={buttonFilterStyle}
          color={props.filter === "completed" ? "secondary" : "primary"}
          onClick={onClickCompletedHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
export { ToDoList };
