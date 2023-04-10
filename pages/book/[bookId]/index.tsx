import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { BookForm } from '../../../src/components/forms/BookForm';
import { useBooks } from '../../../src/components/hooks/useBooks';
import { useNotes } from '../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../src/components/layout/BookLayout';
import { Notes } from '../../../src/components/Notes';
import { getBookById } from '../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../src/services/getNotesByLabelIds';
import type { Note } from '../../../src/types/services';
import { getBookWithId } from '../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../src/utilities/sidebar-labels';

type BookProps = {
  initialNotes?: Note[];
  currentBookId: string;
};

export default function BookPage({
  initialNotes,
  currentBookId,
}: BookProps): ReactElement {
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);
  const { createNote, deleteNote, notes } = useNotes(initialNotes ?? []);

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="book"
    >
      {book?.id ? (
        <>
          <BookForm bookId={book.id} initialValues={book} />
          <Notes
            book={book}
            bookId={currentBookId}
            createNote={createNote}
            deleteNote={deleteNote}
            initialLabels={[String(book.label.id)]}
            notes={notes}
          />
        </>
      ) : (
        <div>No Book Found</div>
      )}
    </BookLayout>
  );
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: BookProps;
}> {
  const bookId = context.query.bookId as string;
  try {
    const book = await getBookById(Number(bookId));

    const labelId = book.label.id;
    const initialNotes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        initialNotes,
        currentBookId: bookId,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentBookId: bookId,
      },
    };
  }
}
