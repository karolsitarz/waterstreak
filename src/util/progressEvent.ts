import { ObjectDate, startDay, objectToDate } from "./time";
import LinkedProgress from "../components/Progress/LinkedProgress";
import EntryList from "../components/EntryList";

interface Listener {
  [key: number]: LinkedProgress[];
}
const listeners: Listener = {};
let entries: EntryList;

export const addProgressListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  const id = startDay(objectToDate(date)).getTime();

  const listener = listeners[id];
  if (listener == null) listeners[id] = [element];
  else listener.push(element);
};

export const removeProgressListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  const id = startDay(objectToDate(date)).getTime();

  if (!(id in listeners)) return;
  if (listeners[id] == null) return;
  const i = listeners[id].indexOf(element);
  if (i < 0) return;
  listeners[id].splice(i, 1);
};

export const addEntryListener = (element: EntryList): void => {
  entries = element;
};

export const dispatchIntakeListeners = (date: Date): void => {
  const id = startDay(date).getTime();
  const progresses = listeners[id];

  if (entries) entries.getValues(); // TODO: optimize getting values
  if (progresses == null) return;
  for (let element of progresses) element.updateIntake();
};

export const dispatchGoalListeners = (date: Date): void => {
  const id = startDay(date).getTime();
  const progresses = listeners[id];

  if (progresses == null) return;
  for (let element of progresses) element.updateGoal();
};
