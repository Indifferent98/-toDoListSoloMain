import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
});

const authInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/auth",
  withCredentials: true,
});

export type toDoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type responseType<D = {}> = {
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

type requairedTaskType = {
  title: string;
  description: string | null;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
};

export type ModelTaskUpdateType = {
  title?: string;
  description?: string | null;

  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string | null;
  deadline?: string | null;
};

type responseTaskType = {
  items: taskType[];
  totalCount: number;
  error: string;
};

export type loginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
export type meResponseType = { id: number; email: string; login: string };

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
      responseType<{ item: taskType }>,
      AxiosResponse<responseType<{ item: taskType }>>,
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

  changeCheckBoxStatus(
    toDoListId: string,
    taskId: string,
    status: number,
    title: string
  ) {
    return instance.put<
      responseType,
      AxiosResponse<responseType>,
      { status: number; title: string }
    >(`/${toDoListId}/tasks/${taskId}`, {
      status,
      title,
    });
  },

  deleteTask(toDoListId: string, taskId: string) {
    return instance.delete<responseType>(`/${toDoListId}/tasks/${taskId}`);
  },

  changeTaskState(
    toDoListId: string,
    taskId: string,
    model: requairedTaskType
  ) {
    return instance.put<
      responseType,
      AxiosResponse<responseType>,
      requairedTaskType
    >(`/${toDoListId}/tasks/${taskId}`, {
      ...model,
    });
  },
};

export const authApi = {
  login(loginData: loginType) {
    return authInstance.post<
      responseType<{ userId: number }>,
      AxiosResponse<responseType<{ userId: number }>>,
      loginType
    >(`/login`, loginData);
  },
  me() {
    return authInstance.get<
      responseType,
      AxiosResponse<responseType<meResponseType>>
    >(`/me`);
  },

  signOut() {
    return authInstance.delete<responseType>(`/login`);
  },
};
