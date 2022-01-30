import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BlogState from "./context/BlogState";
import UserState from "./context/UserState";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BlogState>
        <UserState>
          <App />
        </UserState>
      </BlogState>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
