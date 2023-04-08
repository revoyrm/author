import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { ChapterForm } from '../../../../src/components/forms/ChapterForm';
import { useChapters } from '../../../../src/components/hooks/useChapters';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getChapterById } from '../../../../src/services/getChapterById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { Chapter, Note } from '../../../../src/types/services';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type ChapterProps = {
  notes?: Note[];
  chapter?: Chapter;
  currentChapterId: string;
  currentBookId: string;
};

export default function ChapterPage({
  notes,
  chapter,
  currentChapterId,
  currentBookId,
}: ChapterProps): ReactElement {
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

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: ChapterProps;
}> {
  const bookId = context.query.bookId as string;
  const chapterId = context.query.chapterId as string;
  try {
    const chapter = await getChapterById(Number(chapterId));

    const labelId = chapter.label.id;
    const notes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        notes,
        chapter,
        currentChapterId: chapterId,
        currentBookId: bookId,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentChapterId: chapterId,
        currentBookId: bookId,
      },
    };
  }
}
