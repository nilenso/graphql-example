import * as _ from "lodash";
import { useMachine } from "@xstate/react";
import * as React from "react";
import { createMachine } from "xstate";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonMachine = createMachine({
  id: "button-machine",
  initial: "idle",
  states: {
    idle: {
      on: {
        click: "waiting",
      },
    },
    waiting: {
      on: {
        done: "success",
        error: "failure",
      },
    },
    success: {
      after: {
        1000: { target: "idle" },
      },
    },
    failure: {
      after: {
        1000: { target: "idle" },
      },
    },
  },
});

export const Button = (props: ButtonProps) => {
  const [state, send] = useMachine(ButtonMachine);

  const additionalClasses = {
    waiting: "loading",
    success: "btn-success",
    failure: "btn-failure",
  };

  const classes = ["btn", props.className];
  const allClasses = _.concat(
    classes,
    _.get(additionalClasses, state.value as string, [])
  );

  console.log(allClasses);
  return (
    <button className={allClasses.join(" ")} {...props}>
      {props.children}
    </button>
  );
};
