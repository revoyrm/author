import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { CharacterForm } from '../../../../src/components/forms/CharacterForm';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getCharacterById } from '../../../../src/services/getCharacterById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { Character, Note } from '../../../../src/types/services';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type CharacterProps = {
  notes?: Note[];
  character?: Character;
  currentCharacterId: string;
  currentBookId: string;
};

export default function CharacterPage({
  notes,
  character,
  currentCharacterId,
  currentBookId,
}: CharacterProps): ReactElement {
  // const { getCharacters } = useCharacters();
  // const characters = getCharacters(currentBookId);
  // const character = characters.find((s) => String(s.id) === currentCharacterId);

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

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: CharacterProps;
}> {
  const bookId = context.query.bookId as string;
  const characterId = context.query.characterId as string;
  try {
    const character = await getCharacterById(Number(characterId));

    const labelId = character.label.id;
    const notes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        notes,
        character,
        currentCharacterId: characterId,
        currentBookId: bookId,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentCharacterId: characterId,
        currentBookId: bookId,
      },
    };
  }
}
