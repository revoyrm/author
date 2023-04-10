import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { ChapterForm } from '../../../../src/components/forms/ChapterForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useChapters } from '../../../../src/components/hooks/useChapters';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Notes } from '../../../../src/components/Notes';
import { getChapterById } from '../../../../src/services/getChapterById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import type { Note } from '../../../../src/types/services';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type ChapterProps = {
  initialNotes?: Note[];
  currentChapterId: string;
  currentBookId: string;
};

export default function ChapterPage({
  initialNotes,
  currentChapterId,
  currentBookId,
}: ChapterProps): ReactElement {
  const { getChapters } = useChapters();
  const { books } = useBooks();
  const { createNote, deleteNote, notes } = useNotes(initialNotes ?? []);
  const book = getBookWithId(currentBookId, books);
  const chapters = getChapters(currentBookId);
  const chapter = chapters.find((s) => String(s.id) === currentChapterId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Chapters}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="book"
    >
      {chapter?.id ? (
        <>
          <ChapterForm
            bookId={currentBookId}
            chapterId={currentChapterId}
            initialValues={chapter}
          />
          <Notes
            book={book}
            bookId={currentBookId}
            createNote={createNote}
            deleteNote={deleteNote}
            initialLabels={[String(chapter.label.id)]}
            notes={notes}
          />
        </>
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
    const initialNotes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        initialNotes,
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
