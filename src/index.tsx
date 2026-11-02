import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import "./index.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  // 'bypass' silences console warnings for unmocked static assets
  // or Fluent UI's Griffel style injections
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <App />
        </FluentProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
});
