import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';
import { useCallback } from 'react';

import { NoteForm } from '../../../../src/components/forms/NoteForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { NoteFormData } from '../../../../src/types/forms';
import type { Note } from '../../../../src/types/services';
import { getAllLabelIdsFromBook } from '../../../../src/utilities/getAllLabelIdsFromBook';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type NotePageProps = {
  initialNotes: Note[];
  currentNoteId: string;
  currentBookId: string;
};

export default function NotePage({
  initialNotes,
  currentBookId,
  currentNoteId,
}: NotePageProps): ReactElement {
  const { getCurrentNote, updateNote } = useNotes(initialNotes);
  const { books } = useBooks();
  const curBook = getBookWithId(currentBookId, books);
  const note = getCurrentNote(currentNoteId);

  const handleSubmit = useCallback(
    async (data: NoteFormData): Promise<void> => {
      const { noteTitle, noteDescription, noteLabels } = data;
      if (note?.id) {
        await updateNote(note, {
          title: noteTitle,
          note: noteDescription,
          labelIds: noteLabels ?? [],
        });
      }
    },
    [note, updateNote]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      {note?.id ? (
        <NoteForm book={curBook} note={note} onSubmit={handleSubmit} />
      ) : (
        <div>No Note Found</div>
      )}
    </BookLayout>
  );
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: NotePageProps;
}> {
  const bookId = context.query.bookId as string;
  const noteId = context.query.noteId as string;
  try {
    const book = await getBookById(Number(bookId));

    const labelIds = getAllLabelIdsFromBook(book);

    const notes = await getNotesByLabelIds(labelIds);

    return {
      props: {
        initialNotes: notes,
        currentBookId: bookId,
        currentNoteId: noteId,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      initialNotes: [],
      currentBookId: bookId,
      currentNoteId: noteId,
    },
  };
}
