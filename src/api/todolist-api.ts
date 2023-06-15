import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "2ca10f7e-8d65-43a0-a381-2411fab70789",
  },
};
const apiBaseUrl = "https://social-network.samuraijs.com/api/1.1/todo-lists";

export const TodolistApi = {
  getToDoLists() {
    return axios.get(apiBaseUrl, settings);
  },
  createToDoList(title: string) {
    return axios.post(
      apiBaseUrl,
      {
        title,
      },
      settings
    );
  },
  updateToDoListTitle(toDoListId: string, newTitle: string) {
    return axios.put(
      apiBaseUrl + "/" + toDoListId,
      { title: newTitle },
      settings
    );
  },
  deleteToDoList(todolistid: string) {
    return axios.delete(apiBaseUrl + "/" + todolistid, settings);
  },
};
