import { open, INTAKE_TABLE_NAME } from "./open";
import {
  startDay,
  endDay,
  ObjectDate,
  today,
  objectToDate
} from "../util/time";

export const add = async (
  volume: number,
  date: Date = new Date()
): Promise<void> => {
  const db = await open();
  await db.put(INTAKE_TABLE_NAME, volume, date.getTime());
};

export const get = async (key: number): Promise<number> => {
  const db = await open();
  return await db.get(INTAKE_TABLE_NAME, key);
};

export const remove = async (key: number): Promise<void> => {
  const db = await open();
  return await db.delete(INTAKE_TABLE_NAME, key);
};

export const getAll = async (): Promise<number[]> => {
  const db = await open();
  return await db.getAllKeys(INTAKE_TABLE_NAME);
};

const getValuesBetween = async (start: Date, end: Date): Promise<number[]> => {
  const db = await open();
  return await db.getAll(
    INTAKE_TABLE_NAME,
    IDBKeyRange.bound(start.getTime(), end.getTime())
  );
};

export const getValuesDay = async (
  date: ObjectDate = today()
): Promise<number[]> => {
  const tempDate = objectToDate(date);
  return getValuesBetween(startDay(tempDate), endDay(tempDate));
};
