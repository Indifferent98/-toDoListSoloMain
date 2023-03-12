type tasksType = {
  id: number;
  titleTask: string;
  isDone: boolean;
};

type DoToListPropType = {
  title: string;
  tasks: Array<tasksType>;
  removeTask: (id: number) => void;
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
export { ToDoList };
