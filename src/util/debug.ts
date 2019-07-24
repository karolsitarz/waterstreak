import * as DB from "./db";
import { dispatchListeners } from "./progressEvent";

(() => {
  if (localStorage.debug !== "true") return;
  window.db = DB;
  window.dpl = dispatchListeners;
})();
