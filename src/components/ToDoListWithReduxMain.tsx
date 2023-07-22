import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../store/Store";
import {
  addTaskActionCreator,
  changeCheckBoxStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
} from "../Reducers/task-reducer";
import {
  ChangeFilterAC,
  ChangeHeadderTitleAC,
  DeleteToDoListAC,
  todoListDomainType,
} from "../Reducers/toDoList-reducer";
import { TaskStatuses, taskType } from "../api/todolist-api";

export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  toDoList: todoListDomainType;
};

export const ToDoListWithRedux: React.FC<DoToListPropType> = ({ toDoList }) => {
  const { id, title, filter } = toDoList;
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, taskType[]>(
    (state) => state.task[id]
  );

  let styleForDoTolist = "ToDoList1";
  tasks.forEach((t) => {
    if (t.status === TaskStatuses.Completed) {
      styleForDoTolist = "ToDoList";
    }
  });

  const addTaskButtonHandler = useCallback(
    (title: string): void => {},
    [dispatch]
  );
  const buttonFilterStyle = {
    marginLeft: "4px",
    borderRadius: "8px",
    border: "1px solid white",
  };

  const onClickAllHandler = (): void => {
    dispatch(ChangeFilterAC("all", id));
  };
  const onClickActiveHandler = (): void => {
    dispatch(ChangeFilterAC("active", id));
  };
  const onClickCompletedHandler = (): void => {
    dispatch(ChangeFilterAC("completed", id));
  };
  const deleteToDoListHandler = () => {
    dispatch(DeleteToDoListAC(id));
  };
  const changeHeadderTitle = (title: string) => {
    dispatch(ChangeHeadderTitleAC(title, id));
  };
  let taskForRender = tasks;
  if (filter === "active") {
    taskForRender = tasks.filter((t) => t.status === TaskStatuses.New);
  } else if (filter === "completed") {
    taskForRender = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div className={styleForDoTolist}>
      <Typography
        fontWeight={700}
        sx={{ marginBottom: "15px" }}
        align="center"
        variant="h5"
      >
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <EditableSpan addItem={changeHeadderTitle} title={title} />
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
        {taskForRender.map((t) => {
          const removeButtonHandler = () => {
            dispatch(removeTaskActionCreator(t.id, id));
          };
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(
              changeCheckBoxStatusActionCreator(
                t.id,
                e.currentTarget.checked,
                id
              )
            );
          };
          const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleActionCreator(t.id, title, id));
          };

          return (
            <div
              style={
                t.status === TaskStatuses.Completed
                  ? { opacity: 0.6 }
                  : { opacity: 1 }
              }
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
                  checked={t.status === TaskStatuses.Completed ? true : false}
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
          color={filter === "all" ? "secondary" : "primary"}
          onClick={onClickAllHandler}
        >
          All
        </Button>
        <Button
          size="small"
          disableElevation
          style={buttonFilterStyle}
          color={filter === "active" ? "secondary" : "primary"}
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
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={onClickCompletedHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
