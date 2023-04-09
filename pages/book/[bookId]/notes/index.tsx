import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';

import { NoteForm } from '../../../../src/components/forms/NoteForm';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { NoteCard } from '../../../../src/components/notes/NoteCard';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { NoteFormData } from '../../../../src/types/forms';
import type { Note } from '../../../../src/types/services';
import { getAllLabelIdsFromBook } from '../../../utilities/getAllLabelIdsFromBook';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type NotesProps = {
  initialNotes: Note[];
  currentBookId: string;
};

export default function Notes({
  initialNotes = [],
  currentBookId,
}: NotesProps): ReactElement {
  const { notes, deleteNote, createNote } = useNotes(initialNotes);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewBook = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsCreating(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: NoteFormData): Promise<void> => {
      const { noteTitle, noteDescription } = data;

      await createNote(noteTitle, noteDescription, []);
      setIsCreating(false);
    },
    [createNote]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.AllNotes}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Characters"
    >
      {isCreating || notes.length === 0 ? (
        <div className="w-full p-8">
          <NoteForm
            onCancel={isCreating ? handleCancel : undefined}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        <Cards>
          <NewCard
            label="New Setting"
            onClick={handleNewBook}
            onEnter={handleNewBook}
          />
          {notes.map((note) => (
            <NoteCard
              key={`note_${note.id}`}
              bookId={currentBookId}
              onDelete={deleteNote}
              {...note}
            />
          ))}
        </Cards>
      )}
    </BookLayout>
  );
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: NotesProps;
}> {
  const bookId = context.query.bookId as string;
  try {
    const book = await getBookById(Number(bookId));

    const labelIds = getAllLabelIdsFromBook(book);

    const notes = await getNotesByLabelIds(labelIds);

    return {
      props: {
        initialNotes: notes,
        currentBookId: context.query.bookId as string,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      initialNotes: [],
      currentBookId: context.query.bookId as string,
    },
  };
}
