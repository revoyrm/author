import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { CharacterForm } from '../../../../src/components/forms/CharacterForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useCharacters } from '../../../../src/components/hooks/useCharacters';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Notes } from '../../../../src/components/Notes';
import { getCharacterById } from '../../../../src/services/getCharacterById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { Note } from '../../../../src/types/services';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type CharacterProps = {
  initialNotes?: Note[];
  currentCharacterId: string;
  currentBookId: string;
};

export default function CharacterPage({
  initialNotes,
  currentCharacterId,
  currentBookId,
}: CharacterProps): ReactElement {
  const { getCharacters } = useCharacters();
  const { books } = useBooks();
  const { createNote, deleteNote, notes } = useNotes(initialNotes ?? []);
  const book = getBookWithId(currentBookId, books);
  const characters = getCharacters(currentBookId);
  const character = characters.find((s) => String(s.id) === currentCharacterId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Characters}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="book"
    >
      {character?.id ? (
        <>
          <CharacterForm
            bookId={currentBookId}
            characterId={currentCharacterId}
            initialValues={character}
          />
          <Notes
            book={book}
            bookId={currentBookId}
            createNote={createNote}
            deleteNote={deleteNote}
            initialLabels={[String(character.label.id)]}
            notes={notes}
          />
        </>
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
    const initialNotes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        initialNotes,
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
