import type { ReactElement } from 'react';

import { BookItemCard } from '../BookItemCard';
import { Cards } from './Cards';

export type SearchResult = {
  id: number;
  bookId: string;
  body: string;
  title: string;
  route: 'book' | 'chapters' | 'characters' | 'notes' | 'settings';
};

export function SearchResults({
  results,
}: {
  results: SearchResult[];
}): ReactElement {
  return (
    <Cards>
      {results.map(({ id, bookId, title, body, route }) => (
        <BookItemCard
          key={`search_${id}`}
          body={body}
          bookId={bookId}
          header={title}
          id={id}
          path={route}
        />
      ))}
    </Cards>
  );
}
