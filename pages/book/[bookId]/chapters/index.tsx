import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import { getBookWithId } from '../../../utilities/getBookWithId';
import { SidebarLabels } from '../../../utilities/sidebar-labels';
import { Chapter } from '../../../../src/types/services';

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
