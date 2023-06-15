import { dividerClasses } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TodolistApi } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetToDoLists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    TodolistApi.getToDoLists().then((res) => {
      setState(res.data);
    });
  }, []);

  return (
    <div>
      {state ? state.map((t: any) => <div>{JSON.stringify(t)}</div>) : null}
    </div>
  );
};

export const CreateToDoList = () => {
  const [state, setState] = useState<any>(null);

  // useEffect(() => {
  //   axios
  //     .post(
  //       apiBaseUrl + "todo-lists",
  //       {
  //         title: "hello",
  //       },
  //       settings
  //     )
  //     .then((res) => setState(res.data));
  // }, []);

  const createToDo = () => {
    TodolistApi.createToDoList(todoListTitle).then((res) => setState(res.data));
    setToDoListTitle("");
  };
  const [todoListTitle, setToDoListTitle] = useState("");

  const onchangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoListTitle(e.currentTarget.value);
  };
  return (
    <div>
      <div>
        <input
          onChange={onchangehandler}
          type="text"
          placeholder="title"
          value={todoListTitle}
        />
        <button onClick={createToDo}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const UpdateToDoListTitle = () => {
  const [state, setState] = useState<any>(null);

  // useEffect(() => {}, []);
  const [todolistid, setTodolistid] = useState("");
  const [newTodolistTitle, setNewTodolistTitle] = useState("");
  const updToDoListTitle = () => {
    TodolistApi.updateToDoListTitle(todolistid, newTodolistTitle).then((res) =>
      setState(res)
    );
  };

  const onchangehandler1 = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };
  const onchangehandler2 = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodolistTitle(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="todolistid"
          value={todolistid}
          onChange={onchangehandler1}
        />
        <input
          type="text"
          placeholder="newToDoListTitle"
          value={newTodolistTitle}
          onChange={onchangehandler2}
        />
        <button onClick={updToDoListTitle}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const DeleteToDoList = () => {
  const [state, setState] = useState<any>(null);

  // useEffect(() => {}, []);
  const delList = () => {
    TodolistApi.deleteToDoList(todolistid).then((res) => setState(res));
    setTodolistid("");
  };
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };
  const [todolistid, setTodolistid] = useState("");

  return (
    <div>
      <div>
        <input
          onChange={onchangeHandler}
          type="text"
          placeholder="todolistid"
          value={todolistid}
        />
        <button onClick={delList}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);

  const getTasks = () => {
    TodolistApi.getTasks(todolistid).then((res) => {
      setState(res.data);
    });
  };

  const [todolistid, setTodolistid] = useState("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="todolistid"
          value={todolistid}
          onChange={onChangeHandler}
        />
        <button onClick={getTasks}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const ChangeTaskTitle = () => {
  const [state, setState] = useState<any>(null);

  // useEffect(() => {}, []);
  const [todolistid, setTodolistid] = useState("");
  const [taskId, setTaskId] = useState("");
  const [newTaskTitle, setnewTaskTitle] = useState("");

  const updToDoListTitle = () => {
    TodolistApi.changeTaskTitle(todolistid, taskId, newTaskTitle).then((res) =>
      setState(res)
    );
  };

  const onchangehandler1 = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };
  const onchangehandler2 = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value);
  };
  const onchangehandler3 = (e: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTitle(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="todolistid"
          value={todolistid}
          onChange={onchangehandler1}
        />
        <input
          type="text"
          placeholder="taskId"
          value={taskId}
          onChange={onchangehandler2}
        />
        <input
          type="text"
          placeholder="taskTitle"
          value={newTaskTitle}
          onChange={onchangehandler3}
        />
        <button onClick={updToDoListTitle}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);

  const createToDo = () => {
    TodolistApi.createTask(todolistid, taskTitle).then((res) =>
      setState(res.data)
    );
    setTodolistid("");
  };
  const [taskTitle, setTaskTitle] = useState("");
  const [todolistid, setTodolistid] = useState("");

  const onchangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const onchangehandler2 = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };
  return (
    <div>
      <div>
        <input
          onChange={onchangehandler}
          type="text"
          placeholder="taskTitle"
          value={taskTitle}
        />
        <input
          onChange={onchangehandler2}
          type="text"
          placeholder="Todolistid"
          value={todolistid}
        />
        <button onClick={createToDo}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};

export const RemoveTask = () => {
  const [state, setState] = useState<any>(null);

  const [todolistid, setTodolistid] = useState("");
  const [taskId, setTaskId] = useState("");

  const updToDoListTitle = () => {
    TodolistApi.deleteTask(todolistid, taskId).then((res) => setState(res));
  };

  const onchangehandler1 = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistid(e.currentTarget.value);
  };
  const onchangehandler2 = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="todolistid"
          value={todolistid}
          onChange={onchangehandler1}
        />
        <input
          type="text"
          placeholder="taskId"
          value={taskId}
          onChange={onchangehandler2}
        />

        <button onClick={updToDoListTitle}>+</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
