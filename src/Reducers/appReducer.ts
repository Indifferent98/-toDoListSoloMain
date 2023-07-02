import React from "react";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type initialStateType = {
  status: RequestStatusType;
};

const initialState: initialStateType = {
  status: "idle",
};

type setLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>;

type appActionTypes = setLoadingStatusACType;
export const setLoadingStatusAC = (status: RequestStatusType) =>
  ({
    type: "SET-LOADING-STATUS",
    status,
  } as const);

export const appReducer = (
  state: initialStateType = initialState,
  action: appActionTypes
) => {
  switch (action.type) {
    case "SET-LOADING-STATUS":
      return { ...state, status: action.status };

    default:
      return state;
  }
};
