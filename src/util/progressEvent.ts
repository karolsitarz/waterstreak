import { ObjectDate, startDay, objectToDate } from "./time";
import LinkedProgress from "../components/Progress/LinkedProgress";
import EntryList from "../components/EntryList";
import EntryGroup from "../components/EntryList/EntryGroup";

const intakeListeners: { [key: number]: LinkedProgress[] } = {};
const entryListeners: { [key: number]: EntryGroup } = {};
let entries: EntryList;

export const addIntakeListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  const id = startDay(objectToDate(date)).getTime();

  const listener = intakeListeners[id];
  if (listener == null) intakeListeners[id] = [element];
  else listener.push(element);
};

export const removeIntakeListener = (
  element: LinkedProgress,
  date: ObjectDate
): void => {
  const id = startDay(objectToDate(date)).getTime();

  if (!(id in intakeListeners)) return;
  if (intakeListeners[id] == null) return;
  const i = intakeListeners[id].indexOf(element);
  if (i < 0) return;
  intakeListeners[id].splice(i, 1);
};

export const addEntryListListener = (element: EntryList): void => {
  entries = element;
};

export const addEntryGroupListener = (
  element: EntryGroup,
  date: ObjectDate
): void => {
  const id = objectToDate(date).getTime();
  entryListeners[id] = element;
};

export const dispatchIntakeListeners = (date: Date): void => {
  const id = startDay(date).getTime();
  const progresses = intakeListeners[id];

  if (entries) entries.updateEntry(date);
  if (progresses == null) return;
  for (let element of progresses) element.updateIntake();
};

export const dispatchGoalListeners = (date: Date): void => {
  const id = startDay(date).getTime();
  const progresses = intakeListeners[id];

  if (entryListeners[id]) entryListeners[id].update();

  if (progresses == null) return;
  for (let element of progresses) element.updateGoal();
};
