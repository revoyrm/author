import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { ChapterForm } from '../../../../src/components/forms/ChapterForm';
import { useChapters } from '../../../../src/components/hooks/useChapters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type ChaptersProps = {
  currentBookId: string;
};

export default function Chapters({
  currentBookId,
}: ChaptersProps): ReactElement {
  const { getChapters, deleteChapter } = useChapters();

  const chapters = getChapters(currentBookId);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewBook = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleFinish = useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <BookLayout
      activeNav={SidebarLabels.Chapters}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Chapters"
    >
      {isCreating || chapters.length === 0 ? (
        <div className="w-full p-8">
          <ChapterForm
            bookId={currentBookId}
            onCancel={isCreating ? handleFinish : undefined}
            onSubmit={handleFinish}
          />
        </div>
      ) : (
        <Cards>
          <NewCard label="New Chapter" onClick={handleNewBook} />
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
      )}
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
