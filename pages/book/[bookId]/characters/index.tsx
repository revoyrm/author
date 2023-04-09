import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { CharacterForm } from '../../../../src/components/forms/CharacterForm';
import { useCharacters } from '../../../../src/components/hooks/useCharacters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type CharactersProps = {
  currentBookId: string;
};

export default function Characters({
  currentBookId,
}: CharactersProps): ReactElement {
  const { getCharacters, deleteCharacter } = useCharacters();

  const characters = getCharacters(currentBookId);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewBook = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleFinish = useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <BookLayout
      activeNav={SidebarLabels.Characters}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Characters"
    >
      {isCreating || characters.length === 0 ? (
        <div className="w-full p-8">
          <CharacterForm
            bookId={currentBookId}
            onCancel={isCreating ? handleFinish : undefined}
            onSubmit={handleFinish}
          />
        </div>
      ) : (
        <Cards>
          <NewCard
            label="New Character"
            onClick={handleNewBook}
            onEnter={handleNewBook}
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
      )}
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
