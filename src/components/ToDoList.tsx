import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./ToDoList.module.css";
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
};

const ToDoList = (props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  props.tasks.forEach((t) => {
    if (t.isDone === true) {
      styleForDoTolist = "ToDoList";
    }
  });
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const trimmedTask = title.trim();
  const addTaskButtonHandler = (): void => {
    if (trimmedTask) {
      props.addTask(title, props.toDoListId);
      setTitle("");
    } else {
      setError(true);
      setTitle("");
    }
  };
  const buttonFilterStyle = {
    marginLeft: "4px",
    borderRadius: "8px",
    border: "1px solid white",
  };
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);

    setError(false);
  };
  const errorMessage = error && (
    <div style={{ color: "red" }}> Title is hard requaired </div>
  );
  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      title !== "" &&
      !buttonDisbledCondition
    ) {
      if (trimmedTask) {
        props.addTask(title, props.toDoListId);
        setTitle("");
      } else {
        setTitle("");
        setError(true);
      }
    }
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

  const minWarningLength: number = 10;
  const maxWarningLength: number = 18;
  const buttonDisbledCondition: boolean =
    title.length > maxWarningLength || !title.length;
  const conditionToWarningMessage: boolean | JSX.Element =
    (title.length > minWarningLength && title.length <= maxWarningLength && (
      <div style={{ color: "white" }}>Task Title Shoud be shorter</div>
    )) ||
    (title.length > maxWarningLength && (
      <div style={{ color: "red" }}>Task Title Too Long</div>
    ));

  return (
    <div className={styleForDoTolist}>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? s.inputError : ""}
          placeholder="Input Task Title"
          value={title}
          onKeyDown={onKeyDownInputHandler}
          onChange={inputOnChangeHandler}
        />
        <button
          disabled={buttonDisbledCondition}
          onClick={addTaskButtonHandler}
        >
          +
        </button>
      </div>
      {errorMessage}
      {conditionToWarningMessage}
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
