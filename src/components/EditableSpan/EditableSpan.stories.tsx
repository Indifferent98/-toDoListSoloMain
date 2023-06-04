import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

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
