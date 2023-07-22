import React, { useEffect } from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material/styles";

import { Menu } from "@mui/icons-material";
import { useAppWithRedux } from "../AppWithRedux/hooks/useAppWithRedux";
import Checkbox from "@mui/material/Checkbox";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, AppRootStateType } from "../store/Store";
import { RequestStatusType } from "../Reducers/app-reducer";
import { CustomizedSnackbars } from "../components/ErrorSnackBar/ErrorSnackBar";
import { Login } from "../features/Login";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Todolists } from "../components/ToDoLists/ToDoLists";
import { meTC } from "../features/Auth-reducer";
import { CircularProgress } from "@mui/material";

function AppWithRedux(): JSX.Element {
  const { theme, isDarkMode, changeTheme, signOut } = useAppWithRedux();
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const dispatch: AppDispatchType = useDispatch();
  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                <Link style={{ color: "White" }} to={"/"}>
                  ToDoLists
                </Link>
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={changeTheme} />}
                  label={isDarkMode ? "Dark mode" : "Light mode"}
                />
              </FormGroup>
              {isLoggedIn && (
                <Button color="inherit" onClick={signOut}>
                  Log out
                </Button>
              )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
          </AppBar>

          <Container fixed>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Todolists />} />
              <Route
                path="/404"
                element={
                  <h1 style={{ textAlign: "center" }}>404: Page not found</h1>
                }
              />
              <Route path="*" element={<Navigate to={"404"} />} />
            </Routes>
          </Container>
        </div>
      </CssBaseline>
      <CustomizedSnackbars />
    </ThemeProvider>
  );
}

export default AppWithRedux;
