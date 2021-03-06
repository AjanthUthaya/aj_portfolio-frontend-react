// IMPORT: React
import React from "react";
import ReactDOM from "react-dom";

// IMPORT: Redux
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// IMPORT: Babel polyfill
import "babel-polyfill";

// IMPORT: Raven for sentry
import Raven from "raven-js";

// IMPORT: Google Analytics
import GA from "react-ga";

// IMPORT: Google Analytics
import { hotjar } from "react-hotjar";

// IMPORT: Authentication
//import Auth from "./auth/index";
// IMPORT: Config
import Config from "./local";
// IMPORT: Service worker
import * as serviceWorker from "./serviceWorker";
// IMPORT: Reducers
import reducers from "./reducers/index";
// IMPORT: Application
import App from "./views/app";

// 1. DEFINE: Authentication middleware
const authMiddleware = store => next => action => {
  if (action.type != null) {
    //await Auth();
  }
  next(action);
};

// 2. DEFINE: Variable to store sentry config data
const sentryConfig = Config.sentry;

// 3. DEFINE: Conditions that validate the sentry config
const sentryConfigValid =
  (sentryConfig.app !== "") &
    (sentryConfig.id !== "") &
    (sentryConfig.url !== "") &&
  (sentryConfig.app !== undefined) &
    (sentryConfig.id !== undefined) &
    (sentryConfig.url !== undefined);

// 4. IF: Sentry config is valid
if (sentryConfigValid) {
  // A. CALL: Init sentry
  Raven.config(Config.sentry.url, {
    environment: process.env.NODE_ENV,
    autoBreadcrumbs: true,
    captureUnhandledRejections: true,
    levels: "log"
  }).install();

  // B. ADD: Plugin to catch all console log errors
  Raven.addPlugin(require("raven-js/plugins/console"), console, {
    levels: ["debug", "info", "warn", "error", "log"]
  });
}

// X. DEFINE: GA Config
const gaConfig = Config.ga;

// X. IF: GA Config is valid
if (gaConfig.id !== "" && gaConfig.id !== undefined) {
  // A. CALL: Init GA
  GA.initialize(gaConfig.id);
  GA.pageview(window.location.pathname + window.location.search);
}

// X. DEFINE: HotJar Config
const hotjarConfig = Config.hotjar;

// X. IF: HotJar Config is valid
if (
  hotjarConfig.id !== "" &&
  hotjarConfig.id !== undefined &&
  hotjarConfig.version !== "" &&
  hotjarConfig.version !== undefined
) {
  // A. CALL: Init HotJar
  hotjar.initialize(hotjarConfig.id, hotjarConfig.version);
}

// 5. DEFINE: Redux store
const Store = createStore(
  reducers,
  compose(
    applyMiddleware(authMiddleware, thunk),
    // DEV: Remove line that enables redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

// 6. Render application
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// 7. Register service worker
serviceWorker.register();
