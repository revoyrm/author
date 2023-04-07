import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { BookItemCard } from '../../../../src/components/BookItemCard';
import { SettingForm } from '../../../../src/components/forms/SettingForm';
import { useSettings } from '../../../../src/components/hooks/useSettings';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import { NewCard } from '../../../../src/components/NewCard';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type SettingsProps = {
  currentBookId: string;
};

export default function Settings({
  currentBookId,
}: SettingsProps): ReactElement {
  const { getSettings } = useSettings();

  const settings = getSettings(currentBookId);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewBook = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleFinish = useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <BookLayout
      activeNav={SidebarLabels.Settings}
      bookId={currentBookId}
      heading="Book Name"
      searchType="Settings"
    >
      {isCreating || settings.length === 0 ? (
        <div className="w-full p-8">
          <SettingForm
            bookId={currentBookId}
            onCancel={isCreating ? handleFinish : undefined}
            onSubmit={handleFinish}
          />
        </div>
      ) : (
        <Cards>
          <NewCard label="New Setting" onClick={handleNewBook} />
          {settings.map((setting) => (
            <BookItemCard
              key={`setting_${setting.id}`}
              body={setting.description}
              header={setting.name}
              onClick={(): void => {}}
            />
          ))}
        </Cards>
      )}
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
