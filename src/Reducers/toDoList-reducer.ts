import React from "react";
import { toDolistType } from "../App";

type ActionsType = DeleteToDoListActionType;

type DeleteToDoListActionType = {
  type: "DELETE-TO-DO-LIST";
  toDoListId: string;
};

export const toDoListReducer = (
  state: toDolistType[],
  action: ActionsType
): toDolistType[] => {
  switch (action.type) {
    case "DELETE-TO-DO-LIST":
      return state.filter((t) => t.id !== action.toDoListId);

    default:
      throw new Error("Bad action type");
  }

  return state;
};
