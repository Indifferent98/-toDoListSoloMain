import React from "react";
import {
  appReducer,
  initialStateType,
  setAppErrorStatusAC,
  setLoadingStatusAC,
} from "./app-reducer";

test("Status should be changed", () => {
  const initialState: initialStateType = {
    status: "loading",
    error: null,
  };

  const result = appReducer(initialState, setLoadingStatusAC("succeeded"));
  const result1 = appReducer(initialState, setLoadingStatusAC("failed"));

  expect(result.status).toBe("succeeded");
  expect(result1.status).toBe("failed");
  expect(initialState.status).toBe("loading");
});

test("ErrorStatus should be changed", () => {
  const initialState: initialStateType = {
    status: "loading",
    error: null,
  };

  const result1 = appReducer(initialState, setAppErrorStatusAC(null));
  const result = appReducer(
    initialState,
    setAppErrorStatusAC("some error occured")
  );

  expect(result.error).toBe("some error occured");
  expect(result.status).toBe("loading");
  expect(result1.error).toBe(null);
  expect(initialState.error).toBe(null);
  expect(initialState.status).toBe("loading");
});
