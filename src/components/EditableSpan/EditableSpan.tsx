import React, { FC, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  addItem: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const onDoubleClickHandler = () => {
    setEditMode(true);
  };
  const onBlurInputHandler = () => {
    setEditMode(false);
  };
  return editMode ? (
    <input onDoubleClick={onDoubleClickHandler} />
  ) : (
    <span>{props.title}</span>
  );
};
