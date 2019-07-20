import { openDB, DBSchema, IDBPDatabase } from "idb";
import { startDay, endDay, ObjectDate, today, objectToDate } from "./time";

interface MyDB extends DBSchema {
  waterstreak_data: {
    key: number;
    value: number;
  };
}

const open = async (): Promise<IDBPDatabase<MyDB>> =>
  await openDB<MyDB>("waterstreak", 1, {
    upgrade(db): void {
      db.createObjectStore("waterstreak_data");
    }
  });

export const addToDB = async (
  volume: number,
  date: Date = new Date()
): Promise<void> => {
  const db = await open();
  await db.put("waterstreak_data", volume, date.getTime());
};

export const getByKey = async (key: number): Promise<number> => {
  const db = await open();
  return await db.get("waterstreak_data", key);
};

const getKeysBetween = async (start: Date, end: Date): Promise<number[]> => {
  const db = await open();
  return await db.getAllKeys(
    "waterstreak_data",
    IDBKeyRange.bound(start.getTime(), end.getTime())
  );
};

const getValuesBetween = async (start: Date, end: Date): Promise<number[]> => {
  const db = await open();
  return await db.getAll(
    "waterstreak_data",
    IDBKeyRange.bound(start.getTime(), end.getTime())
  );
};

export const getAllKeys = async (): Promise<number[]> => {
  const db = await open();
  return await db.getAllKeys("waterstreak_data");
};

export const getKeysDay = async (
  date: ObjectDate = today()
): Promise<number[]> => {
  const tempDate = objectToDate(date);
  return getKeysBetween(startDay(tempDate), endDay(tempDate));
};

export const getValuesDay = async (
  date: ObjectDate = today()
): Promise<number[]> => {
  const tempDate = objectToDate(date);
  return getValuesBetween(startDay(tempDate), endDay(tempDate));
};
