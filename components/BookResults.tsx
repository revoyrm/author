import type { ReactElement } from 'react';

import { BookCard } from './BookCard';
import { useBooks } from './hooks/useBooks';

export function BookResults(): ReactElement {
  const { getBooks } = useBooks();
  const books = getBooks();

  return (
    <section className=" m-4 mx-auto flex h-fit max-w-4xl flex-wrap justify-evenly">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </section>
  );
}
