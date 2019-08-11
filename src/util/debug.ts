import * as DB from "../db";
import { dispatchIntakeListeners } from "./progressEvent";

(() => {
  if (localStorage.debug !== "true") return;
  window.db = DB;
  window.dpl = dispatchIntakeListeners;
})();
