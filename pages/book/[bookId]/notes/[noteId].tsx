import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { Note } from '../../../../src/types/services';
import { getAllLabelIdsFromBook } from '../../../utilities/getAllLabelIdsFromBook';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

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
  const { getCurrentNote } = useNotes(initialNotes);
  const note = getCurrentNote(currentNoteId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      <div>{note?.title}</div>
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
