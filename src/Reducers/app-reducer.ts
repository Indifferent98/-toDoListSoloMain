import React from "react";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type initialStateType = {
  status: RequestStatusType;
  error: null | string;
};

const initialState: initialStateType = {
  status: "loading",
  error: null,
};

export type setLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>;

type appActionTypes = setLoadingStatusACType | setAppErrorStatusACType;
export const setLoadingStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  } as const);

export type setAppErrorStatusACType = ReturnType<typeof setAppErrorStatusAC>;

export const setAppErrorStatusAC = (errorStatus: null | string) =>
  ({
    type: "APP/SET-APP-ERROR-STATUS",
    errorStatus,
  } as const);

export const appReducer = (
  state: initialStateType = initialState,
  action: appActionTypes
) => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };

    case "APP/SET-APP-ERROR-STATUS":
      return { ...state, error: action.errorStatus };

    default:
      return state;
  }
};
