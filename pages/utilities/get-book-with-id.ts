import type { Book } from '../../types/library-types';

// eslint-disable-next-line import/prefer-default-export
export const getBookWithId = (
  bookId: number,
  books: Book[]
): Book | undefined => {
  const book = books.find((curBook) => curBook.id === bookId);
  return book;
};
