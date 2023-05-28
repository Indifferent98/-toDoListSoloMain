import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
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
import { TaskWithRedux } from "./taskWithRedux/TaskWithRedux";

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

  const onClickAllHandler = useCallback((): void => {
    props.changeFilter("all", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const onClickActiveHandler = useCallback((): void => {
    props.changeFilter("active", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const onClickCompletedHandler = useCallback((): void => {
    props.changeFilter("completed", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const deleteToDoListHandler = useCallback(() => {
    props.deleteToDoList(props.toDoListId);
  }, [props.toDoListId, props.changeFilter]);

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
            <TaskWithRedux id={t.id} toDoListId={props.toDoListId} />

            // <Task
            //   key={t.id}
            //   id={t.id}
            //   isDone={t.isDone}
            //   removeButtonHandler={removeButtonHandler}
            //   changeCheckBoxStatus={changeCheckBoxStatus}
            //   changeTaskTitle={changeTaskTitle}
            //   title={t.title}
            // />
          );
        })}
      </List>
      <div className={s.item}>
        <ButtonWithMemo
          color={props.filter === "all" ? "secondary" : "primary"}
          title={"All"}
          onClick={onClickAllHandler}
        />
        {/* <Button
          disableElevation
          variant="contained"
          size="small"
          style={buttonFilterStyle}
          color={props.filter === "all" ? "secondary" : "primary"}
          onClick={onClickAllHandler}
        >
          All
        </Button> */}

        {/* <Button
          size="small"
          disableElevation
          style={buttonFilterStyle}
          color={props.filter === "active" ? "secondary" : "primary"}
          // className={props.filter === "active" ? s.buttonStyleActivity : ""}
          onClick={onClickActiveHandler}
          variant="contained"
        >
          Active
        </Button> */}
        <ButtonWithMemo
          color={props.filter === "active" ? "secondary" : "primary"}
          title={"Active"}
          onClick={onClickActiveHandler}
        />
        {/* <Button
          variant="contained"
          size="small"
          disableElevation
          style={buttonFilterStyle}
          color={props.filter === "completed" ? "secondary" : "primary"}
          onClick={onClickCompletedHandler}
        >
          Completed
        </Button> */}
        <ButtonWithMemo
          color={props.filter === "completed" ? "secondary" : "primary"}
          title={"Completed"}
          onClick={onClickCompletedHandler}
        />
      </div>
    </div>
  );
});
export { ToDoList };

type ButtonWithMemoPropsType = {
  title: string;

  onClick: () => void;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
const ButtonWithMemo = React.memo((props: ButtonWithMemoPropsType) => {
  console.log(props.title, " is render");
  const onclickHandler = useCallback(() => {
    props.onClick();
  }, []);

  return (
    <Button
      disableElevation
      variant="contained"
      size="small"
      color={props.color}
      onClick={onclickHandler}
    >
      {props.title}
    </Button>
  );
});
