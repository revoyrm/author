import Router from 'next/router';
import type { ReactElement, MouseEvent } from 'react';
import React from 'react';

import type { Book } from '../types/services';
import { useBooks } from './hooks/useBooks';
import { Card } from './layout/Card';
import { ConfirmButton } from './ConfirmButton';

export function BookCard({ id, title, author, summary }: Book): ReactElement {
  const { setSelectedBook, deleteBook } = useBooks();

  const handleSelectBook = (): void => {
    setSelectedBook(id);
    Router.push(`./book/${id}`).catch(console.error);
  };

  const handleRemoveBook = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('data-info');
    deleteBook(id ?? '');
    console.log(e.currentTarget.getAttribute('data-info'));
  };

  return (
    <Card onClick={handleSelectBook} onKeyDown={handleSelectBook}>
      <h2 className="mb-1 font-bold">{`${title} - ${author}`}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p className="flext-grow">{summary}</p>
      <ConfirmButton
        dataInfo={String(id)}
        label="remove"
        onClick={handleRemoveBook}
        isSubmit={false}
      />
    </Card>
  );
}
