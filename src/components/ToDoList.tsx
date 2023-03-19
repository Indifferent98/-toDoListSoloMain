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
    props.addTask(title);
    setTitle("");
  };
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      props.addTask(title);
      setTitle("");
    }
  };
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
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />{" "}
            <span>{t.titleTask}</span>{" "}
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
export { ToDoList };
