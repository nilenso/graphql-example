import * as React from "react";
import { useMachine } from "@xstate/react";
import { fakeAuthMachine, User } from "./fakeAuth";
import { Navigate, useLocation } from "react-router-dom";

interface AuthOptions {
  isSuccessful?: boolean;
  user?: User;
}
interface AuthContext {
  user?: User;
  login: (authOptions?: AuthOptions) => Promise<User | null>;
  logout: () => Promise<null>;
  signUp: (authOptions?: AuthOptions) => Promise<User | null>;
}

const AuthContext = React.createContext<AuthContext>(null!);

export const useAuth = () => React.useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, send] = useMachine(fakeAuthMachine);

  const user = state.context;
  const login = async (authOptions?: AuthOptions) => {
    if (!authOptions.isSuccessful) {
      send("LOGIN_FAILED");
    }
    let user: User = null;

    if (authOptions.user) {
      user = authOptions.user;
    }

    user = {
      id: 1,
      name: "Test User",
    };
    send("LOGIN_SUCCESS", { user });

    return user;
  };

  const logout = async (): Promise<null> => {
    send("LOGOUT");
    return null;
  };

  const signUp = async (authOptions?: AuthOptions) => {
    if (!authOptions.isSuccessful) {
      send("SIGNUP_FAILED");
    }
    let user: User = null;

    if (authOptions.user) {
      user = authOptions.user;
    }

    user = {
      id: 1,
      name: "Test User",
    };
    send("SIGNUP_SUCCESS", { user });

    return user;
  };

  const value = {
    user,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
