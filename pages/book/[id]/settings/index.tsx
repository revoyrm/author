import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { Header } from '../../../../components/Header';
import type { Setting } from '../../../../types/library-types';

type SettingsProps = {
  settings: Setting[];
};
export default function Settings({ settings }: SettingsProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
      <div />
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
