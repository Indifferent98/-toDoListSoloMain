import React, { ChangeEvent, FC, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  addItem: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.title);
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onDoubleClickHandler = () => {
    setEditMode(true);
    props.addItem(value);
  };
  const onBlurInputHandler = () => {
    props.addItem(value.trim());
    setEditMode(false);
  };
  return editMode ? (
    <input
      value={value}
      onChange={onChangeInputHandler}
      onBlur={onBlurInputHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  );
};
