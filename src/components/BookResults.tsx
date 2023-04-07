import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';

import { BookCard } from './BookCard';
import { BookForm } from './forms/BookForm';
import { useBooks } from './hooks/useBooks';
import { Cards } from './layout/Cards';
import { NewCard } from './NewCard';

export function BookResults(): ReactElement {
  const { books } = useBooks();
  const [isCreating, setIsCreating] = useState(false);
  const handleNewBook = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleFinish = useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <>
      {(isCreating || books.length === 0) && (
        <div className="w-full p-8">
          <BookForm
            onCancel={isCreating ? handleFinish : undefined}
            onSubmit={handleFinish}
          />
        </div>
      )}
      {!isCreating && books.length > 0 && (
        <Cards>
          <NewCard label="New Book" onClick={handleNewBook} />
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </Cards>
      )}
    </>
  );
}
