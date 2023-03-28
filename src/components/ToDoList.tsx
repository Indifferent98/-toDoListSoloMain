import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./ToDoList.module.css";
export type tasksType = {
  id: string;
  titleTask: string;
  isDone: boolean;
};

export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  title: string;
  tasks: Array<tasksType>;
  removeTask: (id: string) => void;
  changeFilter: (status: filterType) => void;
  addTask: (title: string) => void;
  changeCeckboxStatus: (taskId: string, isDone: boolean) => void;
  filter: filterType;
};

const ToDoList = (props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  props.tasks.forEach((t) => {
    if (t.isDone === true) {
      styleForDoTolist = "ToDoList";
    }
  });
  const [title, setTitle] = useState<string>("");
  const addTaskButtonHandler = (): void => {
    if (title !== "") {
      props.addTask(title);
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
  };

  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      title !== "" &&
      !buttonDisbledCondition
    ) {
      props.addTask(title);
      setTitle("");
    }
  };
  const onClickAllHandler = (): void => {
    props.changeFilter("all");
  };
  const onClickActiveHandler = (): void => {
    props.changeFilter("active");
  };
  const onClickCompletedHandler = (): void => {
    props.changeFilter("completed");
  };

  const minWarningLength: number = 10;
  const maxWarningLength: number = 18;
  const buttonDisbledCondition: boolean = title.length > maxWarningLength;
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
          className={s.item}
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
      {conditionToWarningMessage}
      <ul>
        {props.tasks.map((t) => {
          const removeButtonHandler = () => {
            props.removeTask(t.id);
          };
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeCeckboxStatus(t.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id}>
              <input
                onChange={changeTaskStatus}
                type="checkbox"
                checked={t.isDone}
              />
              <span>{t.titleTask}</span>{" "}
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
