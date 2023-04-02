import type { ReactElement } from 'react';

import { Landing } from '../src/components';
import { getAllBooks } from '../src/services/get-books';
import { Book } from '../src/types/services';
import { NextPageContext } from 'next/types';
import { useBooks } from '../src/components/hooks/useBooks';

type HomeProps = {
  books: Book[];
}
export default function Home({books}: HomeProps): ReactElement {
  useInitialBooks(books);
  return (
    <div className="h-full bg-paper">
      <Landing />
    </div>
  );
}


export async function getServerSideProps(context: NextPageContext): Promise<{
  props: HomeProps;
}> {

  const books = await getAllBooks();
  return {
    props: {
      books,
    }, // will be passed to the page component as props
  };
}
