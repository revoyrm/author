import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import type { Character } from '../../../../src/types/services';
import { getBookWithId } from '../../../utilities/getBookWithId';
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
