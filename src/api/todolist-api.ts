// const settings = {
//   withCredentials: true,
//   headers: {
//     "API-KEY": "2ca10f7e-8d65-43a0-a381-2411fab70789",
//   },
// };

import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
});

export type toDoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type responseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: [];
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}

export type taskType = {
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};

type responseTaskType = {
  items: taskType[];
  totalCount: number;
  error: string;
};

export const TodolistApi = {
  getToDoLists() {
    return instance.get<toDoListType[]>("");
  },
  createToDoList(title: string) {
    return instance.post<
      responseType<{ item: toDoListType }>,
      AxiosResponse<responseType<{ item: toDoListType }>>,
      { title: string }
    >("", { title });
  },
  updateToDoListTitle(toDoListId: string, title: string) {
    return instance.put<
      responseType,
      AxiosResponse<responseType>,
      { title: string }
    >(`/${toDoListId}`, { title });
  },
  deleteToDoList(toDoListId: string) {
    return instance.delete<responseType>(`/${toDoListId}`);
  },
  createTask(toDoListId: string, title: string) {
    return instance.post<
      responseType,
      AxiosResponse<responseType>,
      { title: string }
    >(`/${toDoListId}/tasks`, {
      title,
    });
  },

  getTasks(toDoListId: string) {
    return instance.get<responseTaskType>(`/${toDoListId}/tasks`);
  },
  changeTaskTitle(toDoListId: string, taskId: string, title: string) {
    return instance.put<
      responseType,
      AxiosResponse<responseType>,
      { title: string }
    >(`/${toDoListId}/tasks/${taskId}`, {
      title,
    });
  },
  deleteTask(toDoListId: string, taskId: string) {
    return instance.delete<responseType>(`/${toDoListId}/tasks/${taskId}`);
  },
};
