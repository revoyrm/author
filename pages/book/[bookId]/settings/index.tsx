import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
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
  const { getSettings, deleteSetting } = useSettings();

  const settings = getSettings(currentBookId);

  const handleNewBook = useCallback(() => {
    Router.push(`/book/${currentBookId}/settings/new`).catch(console.error);
  }, [Router, currentBookId]);

  return (
    <BookLayout
      activeNav={SidebarLabels.Settings}
      book={book}
      bookId={currentBookId}
      heading={book?.title ?? 'Author'}
      searchType="Settings"
    >
      <Cards>
        <NewCard
          label="New Setting"
          onClick={handleNewBook}
          onEnter={handleNewBook}
        />
        {settings.map((setting) => (
          <BookItemCard
            key={`setting_${setting.id}`}
            body={setting.description}
            bookId={currentBookId}
            header={setting.name}
            id={setting.id}
            path="settings"
            onDelete={deleteSetting}
          />
        ))}
      </Cards>
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
