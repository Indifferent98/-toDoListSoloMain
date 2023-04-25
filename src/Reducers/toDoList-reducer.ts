import React from "react";
import { toDolistType } from "../App";

type ActionsType = {
  type: string;
};

const toDoListReducer = (
  state: toDolistType[],
  action: ActionsType
): toDolistType[] => {
  return state;
};
