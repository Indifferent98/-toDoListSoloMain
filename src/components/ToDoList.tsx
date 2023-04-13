import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./ToDoList.module.css";
import { AddItemForm } from "./AddItemForm/AddItemForm";
export type tasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  toDoListId: string;
  title: string;
  tasks: Array<tasksType>;
  removeTask: (id: string, toDoListId: string) => void;
  changeFilter: (status: filterType, toDoListId: string) => void;
  addTask: (title: string, toDoListId: string) => void;
  changeCeckboxStatus: (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => void;
  filter: filterType;
  deleteToDoList: (toDoListId: string) => void;
};

const ToDoList = (props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  props.tasks.forEach((t) => {
    if (t.isDone === true) {
      styleForDoTolist = "ToDoList";
    }
  });

  const addTaskButtonHandler = (title: string): void => {
    props.addTask(title, props.toDoListId);
  };
  const buttonFilterStyle = {
    marginLeft: "4px",
    borderRadius: "8px",
    border: "1px solid white",
  };

  const onClickAllHandler = (): void => {
    props.changeFilter("all", props.toDoListId);
  };
  const onClickActiveHandler = (): void => {
    props.changeFilter("active", props.toDoListId);
  };
  const onClickCompletedHandler = (): void => {
    props.changeFilter("completed", props.toDoListId);
  };
  const deleteToDoListHandler = () => {
    props.deleteToDoList(props.toDoListId);
  };

  return (
    <div className={styleForDoTolist}>
      <h3>
        {props.title}
        <button onClick={deleteToDoListHandler}>x</button>{" "}
      </h3>
      <AddItemForm addItem={addTaskButtonHandler} />

      <ul>
        {props.tasks.map((t) => {
          const removeButtonHandler = () => {
            props.removeTask(t.id, props.toDoListId);
          };
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeCeckboxStatus(
              t.id,
              e.currentTarget.checked,
              props.toDoListId
            );
          };
          return (
            <li key={t.id}>
              <input
                onChange={changeTaskStatus}
                type="checkbox"
                checked={t.isDone}
              />
              <span className={t.isDone ? s.taskDone : s.taskActive}>
                {t.title}
              </span>
              <button onClick={removeButtonHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div className={s.item}>
        <button
          style={buttonFilterStyle}
          className={props.filter === "all" ? s.buttonStyleActivity : ""}
          onClick={onClickAllHandler}
        >
          All
        </button>
        <button
          style={buttonFilterStyle}
          className={props.filter === "active" ? s.buttonStyleActivity : ""}
          onClick={onClickActiveHandler}
        >
          Active
        </button>
        <button
          style={buttonFilterStyle}
          className={props.filter === "completed" ? s.buttonStyleActivity : ""}
          onClick={onClickCompletedHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
export { ToDoList };
