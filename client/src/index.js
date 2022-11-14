import React from "react";

import ReactDOM from "react-dom/client";

import "@assets/styles/index.css";
import { Provider } from "react-redux";

import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import RoutesComponent from "./routes/Routes";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <RoutesComponent />
    </ErrorBoundary>
  </Provider>
);
