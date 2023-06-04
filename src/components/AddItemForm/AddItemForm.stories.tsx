import type { Meta, StoryObj } from "@storybook/react";

import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";
import { TextField, IconButton } from "@mui/material";

import { title } from "process";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FC } from "react";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: "Todolists/AddItemForm",
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    addItem: action("Button was clicked"),
  },
};

export const AddItemFormErrorStory: Story = {
  render: () => {
    return (
      <div>
        <TextField
          placeholder="Input Title"
          value={"FDGHFDGHDFGHDFGDFHHDF"}
          onKeyDown={() => {
            action("onkeyDown handler");
          }}
          onChange={() => {
            action("onchange handler");
          }}
          id="standard-basic"
          label="type"
          variant="outlined"
          size="small"
          error={true}
          helperText={<div style={{ color: "red" }}> Task Title Too Long </div>}
        />
        <IconButton
          disabled={true}
          onClick={() => {
            action("Button was clicked");
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
};
export const AddItemFormLongTitleWarningStory: Story = {
  render: () => {
    return (
      <div>
        <TextField
          placeholder="Input Title"
          value={"Hello World"}
          onKeyDown={() => {
            action("onkeyDown handler");
          }}
          onChange={() => {
            action("onchange handler");
          }}
          id="standard-basic"
          label="type"
          variant="outlined"
          size="small"
          error={false}
          helperText={
            <div style={{ color: "rgb(69, 97, 210)" }}>
              Task Title Shoud be shorter
            </div>
          }
        />
        <IconButton
          disabled={false}
          onClick={() => {
            alert("button was clicked");
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
};

export const AddItemFormWithEmptyTextFieldStory: Story = {
  render: () => {
    return (
      <div>
        <TextField
          placeholder="Input Title"
          value={""}
          onKeyDown={() => {
            action("onkeyDown handler");
          }}
          onChange={() => {
            action("onchange handler");
          }}
          id="standard-basic"
          label="type"
          variant="outlined"
          size="small"
          error={false}
          helperText={""}
        />
        <IconButton
          disabled={true}
          onClick={() => {
            alert("button was clicked");
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
};

export const AddItemFormWithFocusTextFieldStory: Story = {
  render: () => {
    return (
      <div>
        <TextField
          focused={true}
          placeholder="Input Title"
          value={""}
          onKeyDown={() => {
            action("onkeyDown handler");
          }}
          onChange={() => {
            action("onchange handler");
          }}
          id="standard-basic"
          label="type"
          variant="outlined"
          size="small"
          error={false}
          helperText={""}
        />
        <IconButton
          disabled={true}
          onClick={() => {
            alert("button was clicked");
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
};

export const AddItemFormWhenTryingAddEmptySpaceStory: Story = {
  render: () => {
    return (
      <div>
        <TextField
          placeholder="Input Title"
          value={" "}
          onKeyDown={() => {
            action("onkeyDown handler");
          }}
          onChange={() => {
            action("onchange handler");
          }}
          id="standard-basic"
          label="type"
          variant="outlined"
          size="small"
          error={true}
          helperText={
            <div style={{ color: "red" }}> Title is hard requaired </div>
          }
        />
        <IconButton
          disabled={false}
          onClick={() => {
            alert("button was clicked");
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
};
