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
import { tasksType } from "../ToDoList";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/Store";

type TaskPropsType = {
  removeButtonHandler: (id: string) => void;

  changeCheckBoxStatus: (id: string, checked: boolean) => void;
  changeTaskTitle: (title: string, id: string) => void;

  toDoListId: string;
  id: string;
};

export const TaskWithRedux = React.memo((props: TaskPropsType) => {
  const task = useSelector<AppRootStateType, tasksType>(
    (state) => state.task[props.toDoListId].filter((t) => t.id === props.id)[0]
  );

  console.log("TaskWithRedux is Called");
  const removeButtonHandler = useCallback(() => {
    props.removeButtonHandler(task.id);
  }, [task.id]);

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeCheckBoxStatus(task.id, e.currentTarget.checked);
    },
    [task.id]
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      props.changeTaskTitle(title, task.id);
    },
    [props.changeTaskTitle, task.id]
  );

  return (
    <div
      style={task.isDone ? { opacity: 0.6 } : { opacity: 1 }}
      // className={s.flexStyle}
      key={task.id}
    >
      <ListItem
        disablePadding
        key={task.id}
        secondaryAction={
          <IconButton size="small" onClick={removeButtonHandler}>
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <Checkbox
          onChange={changeTaskStatus}
          size="small"
          checked={task.isDone}
        />

        <EditableSpan title={task.title} addItem={changeTaskTitle} />
      </ListItem>
    </div>
  );
});
