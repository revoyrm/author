import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { NoteForm } from '../../../../src/components/forms/NoteForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { NoteFormData } from '../../../../src/types/forms';
import type { Note } from '../../../../src/types/services';
import { getAllLabelIdsFromBook } from '../../../../src/utilities/getAllLabelIdsFromBook';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type NotesProps = {
  initialNotes: Note[] | null;
  currentBookId: string;
};

export default function Notes({
  initialNotes,
  currentBookId,
}: NotesProps): ReactElement {
  const { notes, deleteNote, createNote } = useNotes(initialNotes ?? []);
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewNote = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsCreating(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: NoteFormData): Promise<void> => {
      const { noteTitle, noteDescription, noteLabels } = data;

      await createNote(noteTitle, noteDescription, noteLabels ?? []);
      setIsCreating(false);
    },
    [createNote]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.Notes}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Characters"
    >
      {isCreating || notes.length === 0 ? (
        <div className="w-full p-8">
          <NoteForm
            book={book}
            onCancel={isCreating ? handleCancel : undefined}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        <Cards>
          <NewCard
            label="New Note"
            onClick={handleNewNote}
            onEnter={handleNewNote}
          />
          {notes.map((note) => (
            <BookItemCard
              key={`note_${note.id}`}
              body={note.note}
              bookId={currentBookId}
              header={note.title}
              id={note.id}
              path="notes"
              onDelete={deleteNote}
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
