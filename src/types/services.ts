export type Label = {
  id: number;
  label: string;
};

export type Note = {
  id: number;
  labels: string[];
  note?: string;
  title: string;
};

export type Chapter = {
  id: number;
  name: string;
  number: number;
  label: Label;
  labels: string[];
  description?: string;
};

export type Setting = {
  id: number;
  name: string;
  label: Label;
  labels: string[];
  description?: string;
};

export type Character = {
  id: number;
  name: string;
  label: Label;
  labels: string[];
  age: number;
  description?: string;
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
