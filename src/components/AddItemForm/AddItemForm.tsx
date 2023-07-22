import React, { ChangeEvent, FC, useState } from "react";

import { IconButton, TextField } from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};
export const AddItemForm: FC<AddItemFormPropsType> = React.memo((props) => {
  console.log("AddItemForm is called");
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const trimmedTask = title.trim();

  const addItemButtonHandler = (): void => {
    if (trimmedTask) {
      props.addItem(title);
      setTitle("");
    } else {
      setError(true);
      setTitle("");
    }
  };
  const errorMessage = error && (
    <div style={{ color: "red" }}> Title is hard requaired </div>
  );
  const onKeyDownInputHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (title.length > maxWarningLength) {
      setError(true);
    }
    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      title !== "" &&
      !buttonDisbledCondition
    ) {
      if (trimmedTask) {
        addItemButtonHandler();
        setTitle("");
      } else {
        setTitle("");
        setError(true);
      }
    }
  };
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
    if (error === true) {
      setError(false);
    }
  };
  const minWarningLength: number = 10;
  const maxWarningLength: number = 18;

  const buttonDisbledCondition: boolean =
    title.length > maxWarningLength || !title.length;

  const conditionToWarningMessage: boolean | JSX.Element =
    (title.length > minWarningLength && title.length <= maxWarningLength && (
      <div style={{ color: "rgb(69, 97, 210)" }}>
        Task Title Shoud be shorter
      </div>
    )) ||
    (title.length > maxWarningLength && (
      <div style={{ color: "red" }}>Task Title Too Long</div>
    ));

  return (
    <div>
      <TextField
        disabled={props.disabled}
        placeholder="Input Title"
        value={title}
        onKeyDown={onKeyDownInputHandler}
        onChange={inputOnChangeHandler}
        id="standard-basic"
        label="type"
        variant="outlined"
        size="small"
        error={error || title.length > maxWarningLength}
        helperText={errorMessage || conditionToWarningMessage}
      />
      <IconButton
        disabled={buttonDisbledCondition}
        onClick={addItemButtonHandler}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
});
