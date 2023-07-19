import React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { LoginTC } from "./Auth-reducer";
import { loginType } from "../api/todolist-api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, AppRootStateType } from "../store/Store";
import { NavLink, Navigate } from "react-router-dom";

type formikErrorType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const dispatch: AppDispatchType = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const errors: formikErrorType = {};

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.trim().length < 4) {
        errors.password = "Must be 4 or more  characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (!emailRegEx.test(values.email)) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: (values: loginType) => {
      dispatch(LoginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                id="email"
                label="Email"
                margin="normal"
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}> {formik.errors.email}</div>
              )}
              <TextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                value={formik.values.rememberMe}
                id="rememberMe"
                label="Remember me"
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps("rememberMe")}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
