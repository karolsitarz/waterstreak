import { ObjectDate, startDay, objectDateToString, dateToString } from './time';
import HydroProgress from '../components/HydroProgress';

interface Listener {
  [key: string]: HydroProgress[]
}
const listeners: Listener = {};

export const addProgressListener = (element: HydroProgress, date: ObjectDate) => {
  const listener = listeners[objectDateToString(date)];
  if (listener == null) listeners[objectDateToString(date)] = [element];
  else listener.push(element);
}

export const dispatchProgressEvent = (date: Date) => {
  const tempStartDay = startDay(date);
  const progresses = listeners[dateToString(tempStartDay)];

  if (progresses == null) return;
  for (let element of progresses) element.updateValue();
}