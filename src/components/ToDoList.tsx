type tasksType = {
  id: number;
  titleTask: string;
  isDone: boolean;
};

type DoToListPropType = {
  title: string;
  tasks: Array<tasksType>;
};
const ToDoList = (props: DoToListPropType): JSX.Element => {
  let value;
  let isAllDoneFalse = false;
  for (let i = 0; i < props.tasks.length; i++) {
    if (props.tasks[i].isDone) {
      isAllDoneFalse = props.tasks[i].isDone;
      break;
    }
  }
  value = isAllDoneFalse ? "ToDoList" : "ToDoList1";
  return (
    <div className={value}>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={props.tasks[0].isDone} />{" "}
          <span>{props.tasks[0].titleTask}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[1].isDone} />{" "}
          <span>{props.tasks[1].titleTask}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[2].isDone} />{" "}
          <span>{props.tasks[2].titleTask}</span>
        </li>
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
