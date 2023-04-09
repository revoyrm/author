export type Label = {
  id: number;
  label: string;
};

export type Note = {
  id: number;
  labels: Label[];
  note?: string;
  title: string;
};

export type Chapter = {
  id: number;
  name: string;
  number: number;
  description: string;
  label: Label;
};

export type Setting = {
  id: number;
  name: string;
  description: string;
  label: Label;
};

export type Character = {
  id: number;
  name: string;
  age: number | string;
  description: string;
  label: Label;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  summary: string;
  characters?: Character[];
  settings?: Setting[];
  chapters?: Chapter[];
  notes?: Note[];
  label?: Label;
};
