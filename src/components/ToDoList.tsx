import { ChangeEvent, KeyboardEvent, useState } from "react";

export type tasksType = {
  id: string;
  titleTask: string;
  isDone: boolean;
};
const aaaa: any = 3;
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
  const [title, setTitle] = useState("");
  const addTaskButtonHandler = () => {
    if (title !== "") {
      props.addTask(title);
      setTitle("");
    }
  };
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && title !== "") {
      props.addTask(title);
      setTitle("");
    }
  };
  const onClickAllHandler = () => {
    props.changeFilter("all");
  };
  const onClickActiveHandler = () => {
    props.changeFilter("active");
  };
  const onClickCompletedHandler = () => {
    props.changeFilter("completed");
  };
  const conditionToWarningMessage =
    (title.length > 10 && title.length <= 18 && (
      <div style={{ color: "white" }}>Task Title Shoud be shorter</div>
    )) ||
    (title.length > 18 && (
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
        <button onClick={addTaskButtonHandler}>+</button>
      </div>
      {conditionToWarningMessage}
      <ul>
        {props.tasks.map((t) => {
          const removeButtonHandler = () => {
            props.removeTask(t.id);
          };
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />{" "}
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
