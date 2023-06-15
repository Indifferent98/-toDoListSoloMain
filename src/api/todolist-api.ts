import axios from "axios";

// const settings = {
//   withCredentials: true,
//   headers: {
//     "API-KEY": "2ca10f7e-8d65-43a0-a381-2411fab70789",
//   },
// };

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
});

type toDoListType = {
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

export const TodolistApi = {
  getToDoLists() {
    return instance.get<toDoListType[]>("");
  },
  createToDoList(title: string) {
    return instance.post<responseType<{ item: toDoListType }>>("", { title });
  },
  updateToDoListTitle(toDoListId: string, title: string) {
    return instance.put<responseType>(`/${toDoListId}`, { title });
  },
  deleteToDoList(toDoListId: string) {
    return instance.delete<responseType>(`/${toDoListId}`);
  },
};
