import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";
import { ChangeEvent, useState } from "react";
import { Typography, TextField } from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: "Todolists/EditableSpan",
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      description: "Set start value",
    },
    addItem: {
      description: "set new value",
    },
  },
  args: {
    addItem: action("change value editablespan"),
    title: "Start title",
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};

export const EditableSpanFocusedStory: Story = {
  render: () => {
    {
      const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {};
      const onDoubleClickHandler = () => {};
      const onBlurInputHandler = () => {};
      return true ? (
        <Typography variant="h5">
          <TextField
            sx={{ width: "170px" }}
            value={"start title"}
            onChange={onChangeInputHandler}
            onBlur={onBlurInputHandler}
            autoFocus
            id="outlined-basic"
            label="change task"
            variant="outlined"
            size="small"
            focused={true}
          />
        </Typography>
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{"start title"}</span>
      );
    }
  },
};
