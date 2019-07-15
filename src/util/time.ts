export const startDay = (date: Date = new Date()): Date => {
  const temp = new Date(date.getTime());
  temp.setHours(0, 0, 0, 0);
  return temp;
}

export const endDay = (date: Date = new Date()): Date => {
  const temp = new Date(date.getTime());
  temp.setHours(23, 59, 59, 999);
  return temp;
}

export const dateToObject = (date: Date): ObjectDate => {
  return {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate()
  }
}

export const objectToDate = (object: ObjectDate): Date => {
  return new Date(objectDateToString(object));
}

export const today = (): ObjectDate => {
  return dateToObject(new Date());
}

export type ObjectDate = {
  y: number
  m: number
  d: number
}

export const objectDateToString = (object: ObjectDate): string => `${object.y}-${object.m}-${object.d}`;

export const dateToString = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const subtractTime = (date: Date, ms: number) => new Date(date.getTime() - ms);