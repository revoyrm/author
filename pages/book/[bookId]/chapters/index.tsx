import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useChapters } from '../../../../src/components/hooks/useChapters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type ChaptersProps = {
  currentBookId: string;
};

export default function Chapters({
  currentBookId,
}: ChaptersProps): ReactElement {
  const Router = useRouter();
  const { getChapters, deleteChapter } = useChapters();
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);

  const chapters = getChapters(currentBookId);

  const handleNewChapter = useCallback(() => {
    Router.push(`/book/${currentBookId}/chapters/new`).catch(console.error);
  }, [Router, currentBookId]);

  return (
    <BookLayout
      activeNav={SidebarLabels.Chapters}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Chapters"
    >
      <Cards>
        <NewCard
          label="New Chapter"
          onClick={handleNewChapter}
          onEnter={handleNewChapter}
        />
        {chapters.map((chapter) => (
          <BookItemCard
            key={`chapter_${chapter.id}`}
            body={chapter.description}
            bookId={currentBookId}
            header={chapter.name}
            id={chapter.id}
            path="chapters"
            onDelete={deleteChapter}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: ChaptersProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    },
  };
}
