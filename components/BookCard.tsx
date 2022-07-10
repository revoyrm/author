import Router from 'next/router';
import type { ReactElement } from 'react';
import React, { useContext } from 'react';

import { Actions } from '../context/actions';
import { AppContext } from '../context/appProvider';
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
    <div
      className="
        h-52
        w-60
        rounded-lg 
        border-2 
        border-primary 
        bg-secondary
        p-2
        text-primary
        hover:border-4
        hover:border-primary-light
        focus:border-4
        focus:border-primary-light"
      role="button"
      tabIndex={0}
      onClick={handleSelectBook}
      onKeyDown={handleSelectBook}
    >
      <h2 className="mb-1 font-bold">{`${title} - ${author ?? ''}`}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p>{summary}</p>
    </div>
  );
}
