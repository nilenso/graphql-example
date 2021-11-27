import * as React from "react";
import "../src/styles/main.css";

export const decorators = [
  (Story) => (
    <div data-theme="retro">
      <Story />
    </div>
  ),
];
export const parameters = {
  xstate: true,
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
