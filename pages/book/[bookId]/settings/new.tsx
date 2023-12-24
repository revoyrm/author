import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { SettingForm } from '../../../../src/components/forms/SettingForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useSettings } from '../../../../src/components/hooks/useSettings';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type SettingsProps = {
  currentBookId: string;
};

export default function Settings({
  currentBookId,
}: SettingsProps): ReactElement {
  const Router = useRouter();
  const { books } = useBooks();
  const book = getBookWithId(currentBookId, books);

  const handleFinish = useCallback(
    (id?: string) => {
      if (id) {
        Router.push(`/book/${currentBookId}/settings/${id}`).catch(
          console.error
        );
      }
    },
    [Router, currentBookId]
  );

  return (
    <BookLayout
      activeNav={SidebarLabels.Settings}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Settings" // todo need?
    >
      <div className="w-full p-8">
        <SettingForm
          bookId={currentBookId}
          onCancel={(): void => {
            Router.push(`/book/${currentBookId}/settings`).catch(console.error);
          }}
          onSubmit={handleFinish}
        />
      </div>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: SettingsProps;
} {
  return {
    props: {
      currentBookId: context.query.bookId as string,
    },
  };
}
