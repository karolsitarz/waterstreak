import { openDB, DBSchema } from 'idb';
 
interface MyDB extends DBSchema {
  'waterstreak_data': {
    key: number
    value: number
  }
}

const midnight = (date: Date = new Date()): Date => {
  date.setHours(0, 0, 0, 0);
  return date;
}

const open = async () => 
  await openDB<MyDB>('waterstreak', 1, {
    upgrade(db) {
      db.createObjectStore('waterstreak_data');
    }
  });

export const add = async (volume: number) => {
  const db = await open();
  await db.put('waterstreak_data', volume, new Date().getTime());
};

export const getKeysBetween = async (startTime: Date = midnight(), endTime: Date = new Date()) => {
  const db = await open();
  return await 
    db.getAllKeys(
      'waterstreak_data',
      IDBKeyRange.bound(
        startTime.getTime(),
        endTime.getTime()));
}

export const getBetween = async (startTime: Date = midnight(), endTime: Date = new Date()) => {
  const db = await open();
  return await 
    db.getAll(
      'waterstreak_data',
      IDBKeyRange.bound(
        startTime.getTime(),
        endTime.getTime()));
}

export const getByKey = async (key: number) => {
  const db = await open();
  return await
    db.get('waterstreak_data', key);
}
