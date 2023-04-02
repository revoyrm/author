import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { BookForm } from '../../../src/components/forms/BookForm';
import { BookLayout } from '../../../src/components/layout/BookLayout';
import { SidebarLabels } from '../../utilities/sidebar-labels';
import { getAllBooks } from '../../../src/services/get-books';

type BookProps = {
  currentBookId: string;
};

export default function Book({ currentBookId }: BookProps): ReactElement {
  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      <BookForm />
    </BookLayout>
  );
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
