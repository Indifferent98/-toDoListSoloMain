import {
  Typography,
  TextField,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TaskStatuses, taskType } from "../../api/todolist-api";

type TaskPropsType = {
  removeButtonHandler: (id: string) => void;

  changeCheckBoxStatus: (id: string, checked: boolean, title: string) => void;
  changeTaskTitle: (title: string, id: string) => void;

  task: taskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  console.log("task is Called");
  const removeButtonHandler = useCallback(() => {
    props.removeButtonHandler(props.task.id);
  }, [props.task.id]);

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeCheckBoxStatus(
        props.task.id,
        e.currentTarget.checked,
        props.task.title
      );
    },
    [props.task.id]
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      props.changeTaskTitle(title, props.task.id);
    },
    [props.changeTaskTitle, props.task.id]
  );

  return (
    <div
      style={
        props.task.status === TaskStatuses.Completed
          ? { opacity: 0.6 }
          : { opacity: 1 }
      }
      // className={s.flexStyle}
      key={props.task.id}
    >
      <ListItem
        disablePadding
        key={props.task.id}
        secondaryAction={
          <IconButton size="small" onClick={removeButtonHandler}>
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <Checkbox
          onChange={changeTaskStatus}
          size="small"
          checked={props.task.status === TaskStatuses.Completed ? true : false}
        />

        <EditableSpan title={props.task.title} addItem={changeTaskTitle} />
      </ListItem>
    </div>
  );
});
