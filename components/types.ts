export type Note = {
  label: string;
  note: string;
};

export type Book = {
  id: number;
  title: string;
  author?: string;
  summary?: string;
  notes?: Note[];
};
