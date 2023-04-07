import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { CharacterForm } from '../../../../src/components/forms/CharacterForm';
import { useCharacters } from '../../../../src/components/hooks/useCharacters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type CharacterProps = {
  currentCharacterId: string;
  currentBookId: string;
};

export default function Character({
  currentCharacterId,
  currentBookId,
}: CharacterProps): ReactElement {
  const { getCharacters } = useCharacters();
  const characters = getCharacters(currentBookId);
  const character = characters.find((s) => String(s.id) === currentCharacterId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      {character?.id ? (
        <CharacterForm
          bookId={currentBookId}
          characterId={currentCharacterId}
          initialValues={character}
        />
      ) : (
        <div>No Character Found</div>
      )}
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: CharacterProps;
} {
  return {
    props: {
      currentCharacterId: context.query.characterId as string,
      currentBookId: context.query.bookId as string,
    },
  };
}
