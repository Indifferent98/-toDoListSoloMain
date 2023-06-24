import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  addItem: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
  console.log("EditableSpan");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.title);
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onDoubleClickHandler = () => {
    setEditMode(true);
  };
  const onBlurInputHandler = () => {
    props.addItem(value.trim());
    setEditMode(false);
  };
  return editMode ? (
    <Typography variant="h5">
      <TextField
        sx={{ width: "170px" }}
        value={value}
        onChange={onChangeInputHandler}
        onBlur={onBlurInputHandler}
        autoFocus
        id="outlined-basic"
        label="change task"
        variant="outlined"
        size="small"
      />
    </Typography>
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  );
});
