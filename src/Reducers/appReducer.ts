import React from "react";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type initialStateType = {
  status: RequestStatusType;
};

const initialState: initialStateType = {
  status: "loading",
};

export type setLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>;

type appActionTypes = setLoadingStatusACType;
export const setLoadingStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  } as const);

export const appReducer = (
  state: initialStateType = initialState,
  action: appActionTypes
) => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };

    default:
      return state;
  }
};
