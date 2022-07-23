import Router from 'next/router';
import type { ReactElement } from 'react';
import React from 'react';

import { Card } from './Card';
import { useBooks } from './hooks/useBooks';
import type { Book } from './types';

export function BookCard({ id, title, author, summary }: Book): ReactElement {
  const { setSelectedBook } = useBooks();

  const handleSelectBook = (): void => {
    setSelectedBook(id);
    Router.push('./book').catch(console.error);
  };

  return (
    <Card onClick={handleSelectBook} onKeyDown={handleSelectBook}>
      <h2 className="mb-1 font-bold">{`${title} - ${author ?? ''}`}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p>{summary}</p>
    </Card>
  );
}
