import * as React from "react";

import { Meta, Story } from "@storybook/react";
import { Button, ButtonMachine } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = (props) => (
  <Button>{props.children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  className: "btn-primary",
  children: "Primary Button",
};

Primary.parameters = {
  xstate: {
    [ButtonMachine.id]: { events: [{ type: "CLICK" }] },
  },
};
