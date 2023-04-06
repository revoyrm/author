import type { ReactElement } from 'react';

import { BookCard } from './BookCard';
import { BookForm } from './forms/BookForm';
import { useBooks } from './hooks/useBooks';
import { Cards } from './layout/Cards';

export function BookResults(): ReactElement {
  const { books } = useBooks();
  return (
    <>
      {!books ||
        (books.length === 0 && (
          <div className="w-full p-8">
            <BookForm />
          </div>
        ))}
      {books && books.length > 0 && (
        <Cards>
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </Cards>
      )}
    </>
  );
}
