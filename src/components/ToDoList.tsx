import { ChangeEvent, KeyboardEvent, useState } from "react";
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

const ToDoList = (props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  props.tasks.forEach((t) => {
    if (t.isDone === true) {
      styleForDoTolist = "ToDoList";
    }
  });

  const addTaskButtonHandler = (title: string): void => {
    props.addTask(title, props.toDoListId);
  };
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
  const changeHeadderTitle = (title: string) => {
    props.changeHeadderTitle(title, props.toDoListId);
  };
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
        {props.tasks.map((t) => {
          const removeButtonHandler = () => {
            props.removeTask(t.id, props.toDoListId);
          };
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeCheckBoxStatus(
              t.id,
              e.currentTarget.checked,
              props.toDoListId
            );
          };
          const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.toDoListId);
          };

          return (
            <div
              style={t.isDone ? { opacity: 0.6 } : { opacity: 1 }}
              className={s.flexStyle}
              key={t.id}
            >
              <ListItem
                disablePadding
                key={t.id}
                secondaryAction={
                  <IconButton size="small" onClick={removeButtonHandler}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              >
                <Checkbox
                  onChange={changeTaskStatus}
                  size="small"
                  checked={t.isDone}
                />

                <EditableSpan title={t.title} addItem={changeTaskTitle} />
              </ListItem>
            </div>
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
};
export { ToDoList };
