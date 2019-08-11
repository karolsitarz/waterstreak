import * as db from "../db";
import * as listeners from "./progressEvent";

(() => {
  if (localStorage.debug !== "true") return;

  window.debug = { db, listeners };
})();
