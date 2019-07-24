import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import GlobalStyles from "./style/global-styles";
import "./util/debug";

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("container")
);

(function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
})();
