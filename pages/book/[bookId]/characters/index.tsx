import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { BookLayout } from '../../../../components/layout/BookLayout';
import { Cards } from '../../../../components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import type { Character } from '../../../../types/library-types';
import { getBookWithId } from '../../../utilities/get-book-with-id';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type CharactersProps = {
  characters: Character[];
  currentBookId: string;
};

export default function Characters({
  characters,
  currentBookId,
}: CharactersProps): ReactElement {
  return (
    <BookLayout
      activeNav={SidebarLabels.Characters}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Characters"
    >
      <Cards>
        {characters.map((character) => (
          <BookItemCard
            key={`character_${character.id}`}
            body={character.description}
            header={character.name}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: CharactersProps;
} {
  const bookId = context.query.bookId as string;
  const book = getBookWithId(bookId, library.books);

  return {
    props: {
      characters: book?.characters ?? [],
      currentBookId: context.query.bookId as string,
    },
  };
}
