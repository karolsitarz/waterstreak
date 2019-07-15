import { openDB, DBSchema } from 'idb';
import { startDay, endDay, ObjectDate, today, objectToDate } from './time';
 
interface MyDB extends DBSchema {
  'waterstreak_data': {
    key: number
    value: number
  }
}

const open = async () => 
  await openDB<MyDB>('waterstreak', 1, {
    upgrade(db) {
      db.createObjectStore('waterstreak_data');
    }
  });

export const addToDB = async (volume: number, date: Date = new Date()) => {
  const db = await open();
  await db.put('waterstreak_data', volume, new Date().getTime());
};

export const getByKey = async (key: number) => {
  const db = await open();
  return await
    db.get('waterstreak_data', key);
};

const getKeysBetween = async (startTime: Date, endTime: Date) => {
  const db = await open();
  return await 
    db.getAllKeys(
      'waterstreak_data',
      IDBKeyRange.bound(
        startTime.getTime(),
        endTime.getTime()));
};

const getValuesBetween = async (startTime: Date, endTime: Date) => {
  const db = await open();
  return await 
    db.getAll(
      'waterstreak_data',
      IDBKeyRange.bound(
        startTime.getTime(),
        endTime.getTime()));
};

export const getKeysDay = async (date: ObjectDate = today()) => {
  const tempDate = objectToDate(date);
  return getKeysBetween(startDay(tempDate), endDay(tempDate));
};

export const getValuesDay = async (date: ObjectDate = today()) => {
  const tempDate = objectToDate(date);
  return getValuesBetween(startDay(tempDate), endDay(tempDate));
};
