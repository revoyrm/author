import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { ChapterForm } from '../../../../src/components/forms/ChapterForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type NewChapterProps = {
  currentBookId: string;
};

export default function NewChapter({
  currentBookId,
}: NewChapterProps): ReactElement {
  const Router = useRouter();
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);

  const handleFinish = useCallback(
    (id?: string) => {
      if (id) {
        Router.push(`/book/${currentBookId}/chapters/${id}`).catch(
          console.error
        );
      }
    },
    [Router, currentBookId]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.Chapters}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Chapters" // todo need?
    >
      <div className="w-full p-8">
        <ChapterForm
          bookId={currentBookId}
          onCancel={(): void => {
            Router.push(`/book/${currentBookId}/chapters`).catch(console.error);
          }}
          onSubmit={handleFinish}
        />
      </div>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: NewChapterProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    },
  };
}
