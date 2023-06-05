import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { Menu } from "@mui/icons-material";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import AppWithRedux, { toDolistType, useStateTaskType } from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./store/ReduxStoreProviderDecorator";
import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  Paper,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  createTheme,
} from "@mui/material";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ToDoList } from "./components/ToDoList";
import { filterType } from "./components/ToDoListWithReduxMain";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: "Todolists/AppWithRedux",
  component: AppWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux />,
};

export const AppWithReduxDarkModeStory: Story = {
  render: () => {
    const themeMode = "dark";
    const theme = createTheme({
      palette: {
        primary: {
          main: "rgb(10, 115, 144)",
        },
        secondary: {
          main: "rgb(208, 86, 86)",
        },
        //mode theme
        mode: themeMode,
      },
    });
    const toDoLists: toDolistType[] = [
      { id: "123", filter: "all", title: "what to buy" },
      { id: "333", filter: "all", title: "what to learn" },
    ];
    const task: useStateTaskType = {
      "123": [
        { id: "4444", title: "React", isDone: true },
        { id: "666", title: "Redux", isDone: false },
      ],
      "333": [
        { title: "Salt", id: "32423", isDone: true },
        { title: "Water", id: "ergdf", isDone: false },
      ],
    };
    const applicationToDoLists = toDoLists.map((t) => {
      return (
        <Grid key={t.id} item>
          <Paper elevation={5}>
            <ToDoList
              deleteToDoList={() => {}}
              key={t.id}
              toDoListId={t.id}
              changeCheckBoxStatus={() => {}}
              changeFilter={() => {}}
              removeTask={() => {}}
              title={t.title}
              tasks={task[t.id]}
              addTask={() => {}}
              filter={t.filter}
              changeTaskTitle={() => {}}
              changeHeadderTitle={() => {}}
            />
          </Paper>
        </Grid>
      );
    });

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
                  ToDoLists
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={true} />}
                    label={"Dark mode" ? "Dark mode" : "Light mode"}
                  />
                </FormGroup>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Container fixed>
              <Grid container sx={{ p: "15px 0" }}>
                <AddItemForm addItem={() => {}} />
              </Grid>
              <Grid container spacing={4}>
                {applicationToDoLists}
              </Grid>
            </Container>
          </div>
        </CssBaseline>
      </ThemeProvider>
    );
  },
};
