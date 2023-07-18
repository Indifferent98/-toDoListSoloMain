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
  //   switch (key) {
  //     case value:
  //       break;
  //     default:
  //       return state;
  //   }
};

type actionsType = LoginACType;
type LoginACType = ReturnType<typeof LoginAC>;
export const LoginAC = (isLoggedIn: boolean) =>
  ({
    type: "login/SET-IS-LOGGED-IN",
    isLoggedIn,
  } as const);

export const LoginTC = (loginData: loginType) => async (dispatch: Dispatch) => {
  try {
    const result = await authApi.login(loginData);
    if (result.data.resultCode === ResultCode.SUCCESS) {
      dispatch(LoginAC(true));
    } else {
      handleServerAppError(result.data, dispatch);
    }
  } catch (e) {
    const error = e as { message: string };
    handleServerNetworkError(error, dispatch);
  }
};
