import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { Header } from '../../../../components/Header';
import type { Chapter } from '../../../../types/library-types';

type ChaptersProps = {
  chapters: Chapter[];
};

export default function Chapters({ chapters }: ChaptersProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
      <div />
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: ChaptersProps;
}> {
  const res = await axios.get<Chapter[]>('/api/get-chapters');
  return {
    props: {
      chapters: res.data,
    },
  };
}
