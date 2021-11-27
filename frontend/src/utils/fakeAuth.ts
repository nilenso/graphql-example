import { createMachine } from "xstate";

export type User = {
  id?: number;
  name?: string;
};

export const fakeAuthMachine = createMachine<User>({
  id: "auth",
  initial: "loggedOut",
  context: {},
  states: {
    loggedOut: {
      on: {
        LOGIN_SUCCESS: "loggedIn",
        LOGIN_FAILURE: "loginFailed",
      },
    },
    loggedIn: {
      on: {
        LOGOUT: "loggedOut",
      },
    },
    loginFailed: {
      type: "final",
    },
    signUp: {
      on: {
        SIGNUP_SUCCESS: "loggedOut",
        SIGNUP_FAILED: "loggedOut",
      },
    },
  },
});
