import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { CharacterForm } from '../../../../src/components/forms/CharacterForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type NewCharacterProps = {
  currentBookId: string;
};

export default function NewCharacter({
  currentBookId,
}: NewCharacterProps): ReactElement {
  const Router = useRouter();
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);

  const handleFinish = useCallback(
    (id?: string) => {
      if (id) {
        Router.push(`/book/${currentBookId}/characters/${id}`).catch(
          console.error
        );
      }
    },
    [Router, currentBookId]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.Characters}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Characters" // todo need?
    >
      <div className="w-full p-8">
        <CharacterForm
          bookId={currentBookId}
          onCancel={(): void => {
            Router.push(`/book/${currentBookId}/characters`).catch(
              console.error
            );
          }}
          onSubmit={handleFinish}
        />
      </div>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: NewCharacterProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    },
  };
}
