import { ObjectDate, startDay, objectToDate } from "./time";
import EntryList from "../components/EntryList";

const intakeListeners: { [key: number]: ProgressObserver[] } = {};
let entries: EntryList;

export interface ProgressObserver {
  updateGoal(): Promise<void>;
  updateIntake(): Promise<void>;
}

export const addListener = (
  element: ProgressObserver,
  date: ObjectDate
): void => {
  const id = startDay(objectToDate(date)).getTime();

  const listener = intakeListeners[id];
  if (listener == null) intakeListeners[id] = [element];
  else listener.push(element);
};

export const removeListener = (
  element: ProgressObserver,
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

  if (progresses == null) return;
  for (let element of progresses) element.updateGoal();
};
