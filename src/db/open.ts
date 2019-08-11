import { openDB, IDBPDatabase, DBSchema } from "idb";

export const INTAKE_TABLE_NAME = "intake";
export const GOAL_TABLE_NAME = "goal";

export interface MyDB extends DBSchema {
  [INTAKE_TABLE_NAME]: {
    key: number;
    value: number;
  };
  [GOAL_TABLE_NAME]: {
    key: number;
    value: number;
  };
}

export const open = async (): Promise<IDBPDatabase<MyDB>> =>
  await openDB<MyDB>("waterstreak", 2, {
    upgrade(db): void {
      db.createObjectStore(INTAKE_TABLE_NAME);
      db.createObjectStore(GOAL_TABLE_NAME);
    }
  });
