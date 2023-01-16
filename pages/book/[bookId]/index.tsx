import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import { BookLayout } from '../../../components/layout/BookLayout';

type BookProps = {
  currentBookId: string;
};

export default function Book({ currentBookId }: BookProps): ReactElement {
  const Router = useRouter();
  const onBack = (): void => {
    Router.push('/').catch(console.error);
  };

  return (
    <BookLayout bookId={currentBookId} heading="Book Name" searchType="book" />
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
