import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { Header } from '../../../../components/Header';
import type { Character } from '../../../../types/library-types';

type CharactersProps = {
  characters: Character[];
};

export default function characters({
  characters,
}: CharactersProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="characters" title="characters of book" showIcon />
      <div />
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: CharactersProps;
}> {
  const res = await axios.get<Character[]>('/api/get-characters');
  return {
    props: {
      characters: res.data,
    },
  };
}
