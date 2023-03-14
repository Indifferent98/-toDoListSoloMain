export type tasksType = {
  id: number;
  titleTask: string;
  isDone: boolean;
};
const aaaa: any = 3;
export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  title: string;
  tasks: Array<tasksType>;
  removeTask: (id: number) => void;
  changeFilter: (status: filterType) => void;
};
const ToDoList = (props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  props.tasks.forEach((t) => {
    if (t.isDone === true) {
      styleForDoTolist = "ToDoList";
    }
  });

  return (
    <div className={styleForDoTolist}>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li>
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
