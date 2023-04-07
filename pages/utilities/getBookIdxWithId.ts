import type { Book } from '../../src/types/services';

// eslint-disable-next-line import/prefer-default-export
export const getBookIdxWithId = (
  bookId: number | string,
  books: Book[]
): number => {
  const idx = books.findIndex((curBook) => curBook.id === bookId);
  return idx;
};
