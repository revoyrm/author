import type { ReactElement } from 'react';

import { BookCard } from './BookCard';
import { useBooks } from './hooks/useBooks';
import { Cards } from './layout/Cards';

export function BookResults(): ReactElement {
  const { getBooks } = useBooks();
  const books = getBooks();

  return (
    <Cards>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </Cards>
  );
}
