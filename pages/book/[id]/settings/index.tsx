import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { Cards } from '../../../../components/layout/Cards';
import type { Setting } from '../../../../types/library-types';

type SettingsProps = {
  settings: Setting[];
};
export default function Settings({ settings }: SettingsProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
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
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: SettingsProps;
}> {
  const res = await axios.get<Setting[]>('/api/get-settings');
  return {
    props: {
      settings: res.data,
    },
  };
}
