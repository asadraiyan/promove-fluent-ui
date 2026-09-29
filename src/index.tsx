import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// @ts-expect-error CSS is loaded by the bundler and has no TypeScript declarations.
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);