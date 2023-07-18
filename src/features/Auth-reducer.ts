import { setLoadingStatusAC } from "./../Reducers/app-reducer";
import { ResultCode } from "./../Reducers/toDoList-reducer";
import { authApi } from "./../api/todolist-api";
import { Dispatch } from "redux";
import { loginType } from "../api/todolist-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../untils/errorUtils";

type initialStateType = {
  isLoggedIn: boolean;
};
const initialState: initialStateType = {
  isLoggedIn: false,
};

export const AuthReducer = (
  state: initialStateType = initialState,
  action: actionsType
) => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

type actionsType = LoginACType;
type LoginACType = ReturnType<typeof LoginAC>;
export const LoginAC = (isLoggedIn: boolean) =>
  ({
    type: "login/SET-IS-LOGGED-IN",
    isLoggedIn,
  } as const);

export const LoginTC = (loginForm: loginType) => async (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC("loading"));

  try {
    const result = await authApi.login(loginForm);
    if (result.data.resultCode === ResultCode.SUCCESS) {
      dispatch(LoginAC(true));
      dispatch(setLoadingStatusAC("succeeded"));
    } else {
      handleServerAppError(result.data, dispatch);
    }
  } catch (e) {
    const error = e as { message: string };
    handleServerNetworkError(error, dispatch);
  }
};

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC("loading"));

  try {
    const result = await authApi.me();
    if (result.data.resultCode === ResultCode.SUCCESS) {
      dispatch(LoginAC(true));
      dispatch(setLoadingStatusAC("succeeded"));
    } else {
      handleServerAppError(result.data, dispatch);
    }
  } catch (e) {
    const error = e as { message: string };
    handleServerNetworkError(error, dispatch);
  }
};
