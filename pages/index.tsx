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
  return (
    <div className="h-full bg-paper">
      <Landing />
    </div>
  );
}
