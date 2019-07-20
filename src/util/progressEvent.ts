import { ObjectDate, startDay, objectDateToString, dateToString } from "./time";
import LinkedProgress from "../components/Progress/LinkedProgress";

interface Listener {
  [key: string]: LinkedProgress[];
}
const listeners: Listener = {};

export const addProgressListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  const listener = listeners[objectDateToString(date)];
  if (listener == null) listeners[objectDateToString(date)] = [element];
  else listener.push(element);
};

export const removeProgressListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  if (!(objectDateToString(date) in listeners)) return;
  if (listeners[objectDateToString(date)] == null) return;
  const i = listeners[objectDateToString(date)].indexOf(element);
  if (i < 0) return;
  listeners[objectDateToString(date)].splice(i, 1);
};

export const dispatchProgressEvent = (date: Date): void => {
  const tempStartDay = startDay(date);
  const progresses = listeners[dateToString(tempStartDay)];

  if (progresses == null) return;
  for (let element of progresses) element.updateValue();
};
