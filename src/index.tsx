import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import GlobalStyles from "./style/global-styles";

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("container")
);
