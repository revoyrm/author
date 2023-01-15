import type { NextPageContext } from 'next';
import Router from 'next/router';
import type { ReactElement } from 'react';

import { Header } from '../../../components/Header';
import { BookLayout } from '../../../components/layout/BookLayout';
import { SideBar } from '../../../components/navigation/SideBar';
import getSidebarItems from '../../utilities/get-side-bar-items';

type BookProps = {
  currentBookId: string;
};

export default function Book({ currentBookId }: BookProps): ReactElement {
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
