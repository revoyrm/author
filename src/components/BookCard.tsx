import Router from 'next/router';
import type { MouseEvent, ReactElement } from 'react';
import React, { useCallback } from 'react';

import type { Book } from '../types/services';
import { ConfirmButton } from './ConfirmButton';
import { useBooks } from './hooks/useBooks';
import { Card } from './layout/Card';

export function BookCard({ id, title, author, summary }: Book): ReactElement {
  const { deleteBook } = useBooks();

  const handleSelectBook = (): void => {
    Router.push(`./book/${id}`).catch(console.error);
  };

  const handleRemoveBook = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      deleteBook(String(id)).catch(console.error);
    },
    [deleteBook, id]
  );

  return (
    <Card onClick={handleSelectBook} onEnter={handleSelectBook}>
      <h2 className="mb-1 font-bold">{`${title} - ${author}`}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p className="flex-grow">{summary}</p>
      <ConfirmButton
        isSubmit={false}
        label="remove"
        onClick={handleRemoveBook}
      />
    </Card>
  );
}
