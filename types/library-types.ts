export type Note = {
  id: number;
  labels: string[];
  note: string;
};

export type Chapter = {
  id: number;
  name: string;
  labels: string[];
  description?: string;
};

export type Setting = {
  id: number;
  name: string;
  labels: string[];
  description?: string;
};

export type Character = {
  id: number;
  name: string;
  labels: string[];
  age: number;
  description?: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  characters: Character[];
  settings: Setting[];
  chapters: Chapter[];
  notes: Note[];
};
