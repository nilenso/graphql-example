import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/main.css";

import { Home } from "./pages/Home";
import { LoggedOutHome } from "./pages/LoggedOutHome";
import { AuthProvider, RequireAuth } from "./utils/AuthProvider";

const App = () => (
  <div data-theme="retro">
    <AuthProvider>
      <Routes data-theme="retro">
        <Route path="/" element={<LoggedOutHome />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
