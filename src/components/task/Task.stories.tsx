import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { TextField, IconButton } from "@mui/material";

import { title } from "process";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FC } from "react";
import { Task } from "./Task";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "Todolists/Task",
  component: Task,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // addItem: {
    //   description: "Button clicked inside form",
    // },
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
  args: {
    changeCheckBoxStatus: action("changeCheckBoxStatus"),
    changeTaskTitle: action("changeTaskTitle"),
    task: { id: "2344", isDone: false, title: "Redux" },
  },
};
export const TaskIsDoneStory: Story = {
  args: {
    changeCheckBoxStatus: action("changeCheckBoxStatus"),
    changeTaskTitle: action("changeTaskTitle"),
    task: { id: "2344", isDone: true, title: "Redux" },
  },
};
