import axios from 'axios';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { Cards } from '../../../../components/layout/Cards';
import type { Character } from '../../../../types/library-types';

type CharactersProps = {
  characters: Character[];
};

export default function Characters({
  characters,
}: CharactersProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="characters" title="characters of book" showIcon />
      <Cards>
        {characters.map((character) => (
          <BookItemCard
            key={`character_${character.id}`}
            body={character.description}
            header={character.name}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: CharactersProps;
}> {
  await Promise.resolve(); // todo remove
  console.log('GOT HERE');
  //const res = await axios.get<Character[]>('/api/get-characters');
  return {
    props: {
      characters: [], //res.data,
    },
  };
}
