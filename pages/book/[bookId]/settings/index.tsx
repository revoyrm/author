import axios from 'axios';
import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { BookLayout } from '../../../../components/layout/BookLayout';
import { Cards } from '../../../../components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import type { Setting } from '../../../../types/library-types';
import { getBookWithId } from '../../../utilities/get-book-with-id';

type SettingsProps = {
  settings: Setting[];
  currentBookId: string;
};
export default function Settings({
  currentBookId,
  settings,
}: SettingsProps): ReactElement {
  return (
    <BookLayout
      bookId={currentBookId}
      heading="Book Name"
      searchType="Settings"
    >
      <Cards>
        {settings.map((setting) => (
          <BookItemCard
            key={`setting_${setting.id}`}
            body={setting.description}
            header={setting.name}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: SettingsProps;
} {
  const bookId = context.query.bookId as string;
  const book = getBookWithId(bookId, library.books);

  return {
    props: {
      settings: book?.settings ?? [],
      currentBookId: context.query.bookId as string,
    },
  };
}
