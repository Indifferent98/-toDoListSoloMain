import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TaskWithRedux } from "./TaskWithRedux";
import { TaskWithReduxProviderDecorator } from "../../store/TaskWithReduxStoreProviderDecorator";
import { ListItem, IconButton, Checkbox } from "@mui/material";
import { useCallback, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTaskActionCreator,
  changeTaskTitleActionCreator,
  changeCheckBoxStatusActionCreator,
} from "../../Reducers/task-reducer";
import { AppRootStateType } from "../../store/Store";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { tasksType } from "../ToDoListWithReduxMain";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
  title: "Todolists/Task",
  component: TaskWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {},
  decorators: [
    TaskWithReduxProviderDecorator,
    (fn) => <div style={{ width: "150px" }}>{fn()}</div>,
  ],
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

export const TaskWithReduxIsNotDoneStory: Story = {
  render: () => {
    const task = {
      "123": [
        { id: "4444", title: "React", isDone: true },
        { id: "666", title: "Redux", isDone: false },
      ],
    };
    return (
      <div
        style={task["123"][1].isDone ? { opacity: 0.6 } : { opacity: 1 }}
        key={task["123"][1].id}
      >
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton size="small" onClick={action("task has been removed")}>
              <DeleteForeverIcon />
            </IconButton>
          }
        >
          <Checkbox
            onChange={action("checkbox status has been changed")}
            size="small"
            checked={task["123"][1].isDone}
          />

          <EditableSpan
            title={task["123"][1].title}
            addItem={action("task title has been changed")}
          />
        </ListItem>
      </div>
    );
  },
};

export const TaskWithReduxIsDoneStory: Story = {
  render: () => {
    const task = {
      "123": [
        { id: "4444", title: "React", isDone: true },
        { id: "666", title: "Redux", isDone: false },
      ],
    };
    return (
      <div
        style={task["123"][0].isDone ? { opacity: 0.6 } : { opacity: 1 }}
        key={task["123"][0].id}
      >
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton size="small" onClick={action("task has been removed")}>
              <DeleteForeverIcon />
            </IconButton>
          }
        >
          <Checkbox
            onChange={action("checkbox status has been changed")}
            size="small"
            checked={task["123"][0].isDone}
          />

          <EditableSpan
            title={task["123"][0].title}
            addItem={action("task title has been changed")}
          />
        </ListItem>
      </div>
    );
  },
};
