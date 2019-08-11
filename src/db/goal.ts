import { open, GOAL_TABLE_NAME } from "./open";

import { startDay, ObjectDate, today, objectToDate } from "../util/time";

export const add = async (volume: number): Promise<void> => {
  if (volume <= 0) return;
  const db = await open();
  const key = startDay(new Date()).getTime();
  const record = db.get(GOAL_TABLE_NAME, key);

  if (record != null) db.delete(GOAL_TABLE_NAME, key);
  await db.put(GOAL_TABLE_NAME, volume, key);
};

export const get = async (date: ObjectDate = today()): Promise<number> => {
  const db = await open();
  const bound = objectToDate(date).getTime();
  const records = await db.getAll(GOAL_TABLE_NAME, IDBKeyRange.bound(0, bound));

  if (Array.isArray(records) && records.length === 0) return null;
  return Math.max(...records);
};
