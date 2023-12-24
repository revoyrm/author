import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useCharacters } from '../../../../src/components/hooks/useCharacters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type CharactersProps = {
  currentBookId: string;
};

export default function Characters({
  currentBookId,
}: CharactersProps): ReactElement {
  const Router = useRouter();
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);
  const { getCharacters, deleteCharacter } = useCharacters();

  const characters = getCharacters(currentBookId);

  const handleNewCharacter = useCallback(() => {
    Router.push(`/book/${currentBookId}/characters/new`).catch(console.error);
  }, [Router, currentBookId]);

  return (
    <BookLayout
      activeNav={SidebarLabels.Characters}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Characters"
    >
      <Cards>
        <NewCard
          label="New Character"
          onClick={handleNewCharacter}
          onEnter={handleNewCharacter}
        />
        {characters.map((character) => (
          <BookItemCard
            key={`character_${character.id}`}
            body={character.description}
            bookId={currentBookId}
            header={character.name}
            id={character.id}
            path="characters"
            onDelete={deleteCharacter}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: CharactersProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    },
  };
}
