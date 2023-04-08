import axios from 'axios';
import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { ApiRoutes } from '../../../src/ApiRoutes';
import { BookForm } from '../../../src/components/forms/BookForm';
import { useBooks } from '../../../src/components/hooks/useBooks';
import { BookLayout } from '../../../src/components/layout/BookLayout';
import type { Book, Note } from '../../../src/types/services';
import { getBookWithId } from '../../utilities/getBookWithId';
import { SidebarLabels } from '../../utilities/sidebar-labels';
import { getBookById } from '../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../src/services/getNotesByLabelIds';

type BookProps = {
  notes?: Note[];
  book?: Book;
  currentBookId: string;
};

export default function BookPage({
  notes,
  book,
  currentBookId,
}: BookProps): ReactElement {
  // const { books } = useBooks();
  // console.log(JSON.stringify({ currentBookId, books }, null, 2));
  // const book = getBookWithId(currentBookId, books);

  console.log(JSON.stringify({ book, notes }, null, 2));
  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      {book?.id ? (
        <BookForm bookId={book.id} initialValues={book} />
      ) : (
        <div>No Book Found</div>
      )}
    </BookLayout>
  );
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: BookProps;
}> {
  try {
    const bookId = context.query.bookId as string;
    const book = await getBookById(Number(bookId));

    const labelId = book.label?.id;
    const notes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        notes,
        book,
        currentBookId: context.query.bookId as string,
      }, // will be passed to the page component as props
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentBookId: context.query.bookId as string,
      }, // will be passed to the page component as props
    };
  }
}
