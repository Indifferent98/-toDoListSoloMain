import React, { FC, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  addItem: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  return editMode ? <input /> : <span>{props.title}</span>;
};
