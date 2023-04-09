import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
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
  const { notes, deleteNote } = useNotes(initialNotes);
  return (
    <BookLayout
      activeNav={SidebarLabels.AllNotes}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Characters"
    >
      <Cards>
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
