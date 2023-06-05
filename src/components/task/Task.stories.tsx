import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import { Task } from "./Task";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "Todolists/Task",
  component: Task,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    changeCheckBoxStatus: action("changeCheckBoxStatus"),
    changeTaskTitle: action("changeTaskTitle"),
    removeButtonHandler: action("removeButtonHandler"),
    task: { id: "taskId", isDone: true, title: "Redux" },
  },
  decorators: [(fn) => <div style={{ width: "150px" }}>{fn()}</div>],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: "taskId", isDone: false, title: "Redux" },
  },
};
export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "taskId", isDone: true, title: "Redux" },
  },
};
