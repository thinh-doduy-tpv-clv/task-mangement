import { PagingVM } from "../view-models/paging-vm";

export const example = (): boolean => {
  return true;
};

export const isEmpty = (value: unknown): boolean => {
  return value === undefined || value === "" || value === null;
};

export const setLanguage = (lang: string) => {
  localStorage.setItem("language-code", lang);
};

export const getYears = (start = 1900, end = 2100) => {
  const years = [];
  for (let i = start; i < end; i += 1) {
    years.push(i);
  }
  return years;
};

export const uid = (): string =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );

const isUnique = <T>(obj: T, index: number, self: T[]) => {
  return (
    index ===
    self.findIndex((o: T) => JSON.stringify(o) === JSON.stringify(obj)) // Check uniqueness based on the "id" property
  );
};

export const uniqueArrayOfObjects = <T>(array: T[]) => array.filter(isUnique);

export const getPaging = (
  totalItems: number,
  count: number,
  currentPaging: PagingVM
): PagingVM => {
  return {
    count,
    currentPage: currentPaging.currentPage,
    perPage: currentPaging.perPage,
    totalItems,
    totalPages: Math.round(totalItems / currentPaging.count),
  };
};
