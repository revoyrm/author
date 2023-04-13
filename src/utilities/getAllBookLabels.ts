import type { Book, Label } from '../types/services';

// eslint-disable-next-line import/prefer-default-export
export const getAllBookLabels = (books: Book[]): Label[] =>
  books.map((book) => book.label);
