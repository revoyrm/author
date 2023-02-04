import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { BookLayout } from '../../../../components/layout/BookLayout';
import { Cards } from '../../../../components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import type { Chapter } from '../../../../types/library-types';
import { getBookWithId } from '../../../utilities/get-book-with-id';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type ChaptersProps = {
  chapters: Chapter[];
  currentBookId: string;
};

export default function Chapters({
  chapters,
  currentBookId,
}: ChaptersProps): ReactElement {
  return (
    <BookLayout
      activeNav={SidebarLabels.Chapters}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Chapters"
    >
      <Cards>
        {chapters.map((chapter) => (
          <BookItemCard
            key={`chapter_${chapter.id}`}
            body={chapter.description}
            header={chapter.name}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: ChaptersProps;
} {
  const bookId = context.query.bookId as string;
  const book = getBookWithId(bookId, library.books);
  return {
    props: {
      chapters: book?.chapters ?? [],
      currentBookId: context.query.bookId as string,
    },
  };
}
