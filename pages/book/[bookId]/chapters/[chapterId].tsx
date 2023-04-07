import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { ChapterForm } from '../../../../src/components/forms/ChapterForm';
import { useChapters } from '../../../../src/components/hooks/useChapters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type ChapterProps = {
  currentChapterId: string;
  currentBookId: string;
};

export default function Chapter({
  currentChapterId,
  currentBookId,
}: ChapterProps): ReactElement {
  const { getChapters } = useChapters();
  const chapters = getChapters(currentBookId);

  console.log({ currentChapterId, chapters });

  const chapter = chapters.find((s) => String(s.id) === currentChapterId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      {chapter?.id ? (
        <ChapterForm
          bookId={currentBookId}
          chapterId={currentChapterId}
          initialValues={chapter}
        />
      ) : (
        <div>No Chapter Found</div>
      )}
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: ChapterProps;
} {
  return {
    props: {
      currentChapterId: context.query.chapterId as string,
      currentBookId: context.query.bookId as string,
    }, // will be passed to the page component as props
  };
}
