import { ChangeEvent, KeyboardEvent, useState } from "react";

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
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.titleTask}</span>{" "}
              <button onClick={removeButtonHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onClickAllHandler}>All</button>
        <button onClick={onClickActiveHandler}>Active</button>
        <button onClick={onClickCompletedHandler}>Completed</button>
      </div>
    </div>
  );
};
export { ToDoList };
