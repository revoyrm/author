import type { ReactElement } from 'react';
import React from 'react';

import { BookResults } from './BookResults';
import { Header } from './Header';

export function Landing(): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="book" title="Author" showIcon />
      <BookResults />
    </div>
  );
}
