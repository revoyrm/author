import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { Cards } from '../../../../components/layout/Cards';
import type { Chapter } from '../../../../types/library-types';

type ChaptersProps = {
  chapters: Chapter[];
};

export default function Chapters({ chapters }: ChaptersProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
      <Cards>
        {chapters.map((chapter) => (
          <BookItemCard
            key={`chapter_${chapter.id}`}
            body={chapter.description}
            header={chapter.name}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
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
