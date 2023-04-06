import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { BookForm } from '../../../src/components/forms/BookForm';
import { useBooks } from '../../../src/components/hooks/useBooks';
import { BookLayout } from '../../../src/components/layout/BookLayout';
import { getBookWithId } from '../../utilities/getBookWithId';
import { SidebarLabels } from '../../utilities/sidebar-labels';

type BookProps = {
  currentBookId: string;
};

export default function Book({ currentBookId }: BookProps): ReactElement {
  const { books } = useBooks();
  // console.log(JSON.stringify({ currentBookId, books }, null, 2));
  const book = undefined; //getBookWithId(currentBookId, books ?? []);

  return <div>No Book Found</div>;
  // if (!book || !book.id) {
  //   return <div>No Book Found</div>;
  // }

  // return (
  //   <BookLayout
  //     activeNav={SidebarLabels.Book}
  //     bookId={currentBookId}
  //     heading="Book Name"
  //     searchType="book"
  //   >
  //     <BookForm initialValues={book} />
  //   </BookLayout>
  // );
}

export function getServerSideProps(context: NextPageContext): {
  props: BookProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    }, // will be passed to the page component as props
  };
}
