import {
  setAppErrorStatusACType,
  setLoadingStatusAC,
  setLoadingStatusACType,
} from "./../Reducers/app-reducer";
import { Dispatch } from "redux";
import { setAppErrorStatusAC } from "../Reducers/app-reducer";

export const handleServerNetworkError = (
  err: { message: string },
  dispatch: Dispatch<errorUntilsDispatchType>
): void => {
  if (err.message) {
    dispatch(setAppErrorStatusAC(err.message));
  } else {
    dispatch(setAppErrorStatusAC("some error was occured"));
  }
  dispatch(setLoadingStatusAC("failed"));
};

type errorUntilsDispatchType = setAppErrorStatusACType | setLoadingStatusACType;

export const handleServerAppError = (
  data: any,
  dispatch: Dispatch<errorUntilsDispatchType>
) => {
  if (data.messages[0]) {
    dispatch(setAppErrorStatusAC(data.messages[0]));
  } else {
    dispatch(setAppErrorStatusAC("Some error occured"));
  }
  dispatch(setLoadingStatusAC("failed"));
};
