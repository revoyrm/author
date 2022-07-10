import Router from 'next/router';
import type { ReactElement } from 'react';
import React, { useContext } from 'react';

import { Actions } from '../context/actions';
import { AppContext } from '../context/appProvider';
import { Card } from './Card';
import type { Book } from './types';

export function BookCard({
  id,
  title,
  author,
  summary,
  notes,
}: Book): ReactElement {
  const { dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    return <div>Must be used within appprovider</div>;
  }

  const handleSelectBook = (): void => {
    dispatch({
      type: Actions.SelectBook,
      payload: id,
    });
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
