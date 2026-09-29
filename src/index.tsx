import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Provider } from "react-redux";
// import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider > */}
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);