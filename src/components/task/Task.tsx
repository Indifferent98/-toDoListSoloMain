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
type TaskPropsType = {
  id: string;
  removeButtonHandler: (id: string) => void;
  isDone: boolean;
  changeCheckBoxStatus: (id: string, checked: boolean) => void;
  changeTaskTitle: (title: string, id: string) => void;
  title: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  console.log("task is Called");
  const removeButtonHandler = useCallback(() => {
    props.removeButtonHandler(props.id);
  }, [props.id]);

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeCheckBoxStatus(props.id, e.currentTarget.checked);
    },
    [props.id]
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      props.changeTaskTitle(title, props.id);
    },
    [props.changeTaskTitle, props.id]
  );

  return (
    <div
      style={props.isDone ? { opacity: 0.6 } : { opacity: 1 }}
      // className={s.flexStyle}
      key={props.id}
    >
      <ListItem
        disablePadding
        key={props.id}
        secondaryAction={
          <IconButton size="small" onClick={removeButtonHandler}>
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <Checkbox
          onChange={changeTaskStatus}
          size="small"
          checked={props.isDone}
        />

        <EditableSpan title={props.title} addItem={changeTaskTitle} />
      </ListItem>
    </div>
  );
});
