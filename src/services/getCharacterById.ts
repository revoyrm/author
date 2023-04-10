import { gql } from 'graphql-request';

import type { Character } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetCharacterById($id: ID) {
    character: getCharacterById(id: $id) {
      book {
        id
      }
      age
      description
      id
      name
      label {
        id
        label
      }
    }
  }
`;

type GetCharacterByIdRequest = {
  character: Character;
};

export async function getCharacterById(id: number): Promise<Character> {
  const { character } = await libraryClient.request<GetCharacterByIdRequest>(
    query,
    {
      id,
    }
  );

  return character;
}
