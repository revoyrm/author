import type { ReactElement } from 'react';

import { BookCard } from './BookCard';
import { useBooks } from './hooks/useBooks';
import { Cards } from './layout/Cards';
import { BookForm } from './forms/BookForm';

export function BookResults(): ReactElement {
  const { books } = useBooks();
  return (
    <>
      {books.length === 0 && (
        <div className="w-full p-8">
          <BookForm />
        </div>
      )}
      {books.length > 0 && (
        <Cards>
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </Cards>
      )}
    </>
  );
}
