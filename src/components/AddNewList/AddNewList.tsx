import React, { ChangeEvent, useState } from "react";

type AddNewListPropsType = {
  addNewToDoList: (title: string) => void;
};
export const AddNewList: React.FC<AddNewListPropsType> = (props) => {
  const [title, setTitle] = useState<string>("");
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const buttonClickHandler = () => {
    props.addNewToDoList(title);
  };

  return (
    <div>
      <div>input new To Do list title</div>
      <input value={title} onChange={onChangeInputHandler} type="text" />
      <button onClick={buttonClickHandler}>+</button>
    </div>
  );
};
