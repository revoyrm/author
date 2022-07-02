import type { ReactElement } from 'react';
import React from 'react';

import type { Book } from './types';

export function BookCard({
  id,
  title,
  author,
  summary,
  notes,
}: Book): ReactElement {
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
        hover:shadow-lg"
      role="button"
      tabIndex={0}
      onClick={(): void => {}}
      onKeyDown={(): void => {}}
    >
      <h2 className="mb-1 font-bold">{`${title} - ${author ?? ''}`}</h2>
      <hr className="mb-1" />
      <p>{summary}</p>
    </div>
  );
}
