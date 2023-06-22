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

import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/Store";
import {
  removeTaskActionCreator,
  changeTaskTitleActionCreator,
  changeCheckBoxStatusActionCreator,
} from "../../Reducers/task-reducer";
import { TaskStatuses, taskType } from "../../api/todolist-api";

type TaskPropsType = {
  toDoListId: string;
  id: string;
};

export const TaskWithRedux = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const task = useSelector<AppRootStateType, taskType>(
    (state) => state.task[props.toDoListId].filter((t) => t.id === props.id)[0]
  );
  const removeTask = () => {
    dispatch(removeTaskActionCreator(props.id, props.toDoListId));
  };

  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(changeTaskTitleActionCreator(props.id, title, props.toDoListId));
    },
    [dispatch, props.id, props.toDoListId]
  );

  const changeCheckBoxStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeCheckBoxStatusActionCreator(
        props.id,
        e.currentTarget.checked,
        props.toDoListId
      )
    );
  };

  console.log("TaskWithRedux is Called");

  return (
    <div
      style={
        task.status === TaskStatuses.Completed
          ? { opacity: 0.6 }
          : { opacity: 1 }
      }
      key={task.id}
    >
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton size="small" onClick={removeTask}>
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <Checkbox
          onChange={changeCheckBoxStatus}
          size="small"
          checked={task.status === TaskStatuses.Completed ? true : false}
        />

        <EditableSpan title={task.title} addItem={changeTaskTitle} />
      </ListItem>
    </div>
  );
});
