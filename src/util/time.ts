export const startDay = (date: Date = new Date()): Date => {
  const temp = new Date(date.getTime());
  temp.setHours(0, 0, 0, 0);
  return temp;
};

export const endDay = (date: Date = new Date()): Date => {
  const temp = new Date(date.getTime());
  temp.setHours(23, 59, 59, 999);
  return temp;
};

export interface ObjectDate {
  y: number;
  m: number;
  d: number;
}

export const objectDateToString = (object: ObjectDate): string =>
  `${object.y}-${object.m}-${object.d}`;

export const dateToString = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const subtractTime = (date: Date, ms: number): Date =>
  new Date(date.getTime() - ms);

export const getFirstDay = (y: number, m: number): number =>
  new Date(`${y}-${m}-01`).getDay();

export const getDaysInMonth = (y: number, m: number): number =>
  new Date(y, m, 0).getDate();

export const nextMonth = (date: ObjectDate): ObjectDate => {
  if (date.m >= 12)
    return {
      d: date.d,
      m: 1,
      y: date.y * 1 + 1
    };
  return {
    ...date,
    m: date.m * 1 + 1
  };
};

export const prevMonth = (date: ObjectDate): ObjectDate => {
  if (date.m <= 1)
    return {
      d: date.d,
      m: 12,
      y: date.y - 1
    };
  return {
    ...date,
    m: date.m - 1
  };
};

export const dateToObject = (date: Date): ObjectDate => {
  return {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate()
  };
};

export const objectToDate = (object: ObjectDate): Date => {
  return new Date(objectDateToString(object));
};

export const today = (): ObjectDate => {
  return dateToObject(new Date());
};
