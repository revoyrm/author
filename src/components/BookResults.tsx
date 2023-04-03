import type { ReactElement } from 'react';

import { BookCard } from './BookCard';
import { useBooks } from './hooks/useBooks';
import { Cards } from './layout/Cards';

export function BookResults(): ReactElement {
  const { books } = useBooks();

  console.log('bookResults', books);

  return (
    <Cards>
      {books.length === 0 && <div>Add a book now</div>}
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </Cards>
  );
}
